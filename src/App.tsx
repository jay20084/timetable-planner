import { useState, useEffect } from 'react';
import { AVAILABLE_SLOTS, DAYS } from './data';
import './App.css';

const MAX_TIMETABLES = 5;

interface Timetable {
  id: number;
  name: string;
  selectedSlotIds: string[];
}

function App() {
  const [timetables, setTimetables] = useState<Timetable[]>(() => {
    const saved = localStorage.getItem('timetables');
    if (saved) {
      return JSON.parse(saved);
    }
    return [{ id: 1, name: 'Timetable 1', selectedSlotIds: [] }];
  });
  const [activeTableId, setActiveTableId] = useState<number>(() => {
    const saved = localStorage.getItem('activeTableId');
    return saved ? JSON.parse(saved) : 1;
  });
  const [conflictError, setConflictError] = useState<{attempted: string, existing: string} | null>(null);
  const [editingName, setEditingName] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(() => {
    const saved = localStorage.getItem('timetableZoom');
    return saved ? JSON.parse(saved) : 100;
  });

  const ZOOM_MIN = 50;
  const ZOOM_MAX = 150;
  const ZOOM_STEP = 10;

  useEffect(() => {
    localStorage.setItem('timetables', JSON.stringify(timetables));
  }, [timetables]);

  useEffect(() => {
    localStorage.setItem('activeTableId', JSON.stringify(activeTableId));
  }, [activeTableId]);

  useEffect(() => {
    localStorage.setItem('timetableZoom', JSON.stringify(zoom));
  }, [zoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setZoom(prev => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        setZoom(prev => Math.max(prev - ZOOM_STEP, ZOOM_MIN));
      } else if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        setZoom(100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeTable = timetables.find(t => t.id === activeTableId) || timetables[0];
  const selectedSlotIds = activeTable.selectedSlotIds;

  const setSelectedSlotIds = (updater: string[] | ((prev: string[]) => string[])) => {
    setTimetables(prev => prev.map(t => {
      if (t.id !== activeTableId) return t;
      const newSlots = typeof updater === 'function' ? updater(t.selectedSlotIds) : updater;
      return { ...t, selectedSlotIds: newSlots };
    }));
  };

  const addTimetable = () => {
    if (timetables.length >= MAX_TIMETABLES) return;
    const newId = Math.max(...timetables.map(t => t.id)) + 1;
    const newTable: Timetable = {
      id: newId,
      name: `Timetable ${newId}`,
      selectedSlotIds: [],
    };
    setTimetables(prev => [...prev, newTable]);
    setActiveTableId(newId);
  };

  const deleteTimetable = (id: number) => {
    if (timetables.length <= 1) return;
    const remaining = timetables.filter(t => t.id !== id);
    setTimetables(remaining);
    if (activeTableId === id) {
      setActiveTableId(remaining[0].id);
    }
  };

  const renameTimetable = (id: number, newName: string) => {
    setTimetables(prev => prev.map(t => t.id === id ? { ...t, name: newName || t.name } : t));
    setEditingName(null);
  };

  const toggleSlot = (slotId: string) => {
    setSelectedSlotIds(prev => {
      if (prev.includes(slotId)) {
        return prev.filter(id => id !== slotId);
      }
      
      const slotToAdd = AVAILABLE_SLOTS.find(s => s.id === slotId);
      if (!slotToAdd) return prev;
      
      const occupiedPositions = new Map<string, string>();
      prev.forEach(id => {
        const selectedSlot = AVAILABLE_SLOTS.find(s => s.id === id);
        if (selectedSlot) {
          selectedSlot.cells.forEach(cell => {
            occupiedPositions.set(`${cell.day}-${cell.col}`, id);
          });
        }
      });
      
      let conflictingSlotId: string | null = null;
      const hasConflict = slotToAdd.cells.some(cell => {
        if (occupiedPositions.has(`${cell.day}-${cell.col}`)) {
          conflictingSlotId = occupiedPositions.get(`${cell.day}-${cell.col}`)!;
          return true;
        }
        return false;
      });
      
      if (hasConflict && conflictingSlotId) {
        const existingSlot = AVAILABLE_SLOTS.find(s => s.id === conflictingSlotId);
        setConflictError({
          attempted: slotToAdd.label,
          existing: existingSlot?.label || conflictingSlotId
        });
        return prev;
      }
      
      return [...prev, slotId];
    });
  };

  const getCellContent = (day: string, type: string, col: number) => {
    for (const slotId of selectedSlotIds) {
      const slot = AVAILABLE_SLOTS.find(s => s.id === slotId);
      if (slot) {
        const occupies = slot.cells.some(c => c.day === day && c.type === type && c.col === col);
        if (occupies) {
          return { content: slot.label, isSelected: true };
        }
      }
    }
    return { content: '', isSelected: false };
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Available Slots</h2>
          {selectedSlotIds.length > 0 && (
            <button className="clear-btn" onClick={() => setSelectedSlotIds([])}>
              Clear All
            </button>
          )}
        </div>
        <div className="slot-groups">
          <div className="slot-group">
            <h3>Theory Slots</h3>
            <div className="slot-buttons">
              {AVAILABLE_SLOTS.filter(s => s.category === 'THEORY')
                .sort((a, b) => a.id.localeCompare(b.id))
                .map(slot => (
                <button 
                  key={slot.id}
                  className={`slot-btn ${selectedSlotIds.includes(slot.id) ? 'active' : ''}`}
                  onClick={() => toggleSlot(slot.id)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="slot-group">
            <h3>Lab Slots</h3>
            <div className="slot-buttons">
              {AVAILABLE_SLOTS.filter(s => s.category === 'LAB').map(slot => (
                <button 
                  key={slot.id}
                  className={`slot-btn ${selectedSlotIds.includes(slot.id) ? 'active' : ''}`}
                  onClick={() => toggleSlot(slot.id)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Timetable Planner</h1>
          <p>Select your slots from the left to build your schedule.</p>
        </header>

        {/* Timetable Tabs */}
        <div className="timetable-tabs">
          {timetables.map(table => (
            <div
              key={table.id}
              className={`tab ${table.id === activeTableId ? 'tab-active' : ''}`}
              onClick={() => setActiveTableId(table.id)}
            >
              {editingName === table.id ? (
                <input
                  className="tab-rename-input"
                  defaultValue={table.name}
                  autoFocus
                  onBlur={(e) => renameTimetable(table.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') renameTimetable(table.id, (e.target as HTMLInputElement).value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className="tab-name"
                  onDoubleClick={(e) => { e.stopPropagation(); setEditingName(table.id); }}
                >
                  {table.name}
                </span>
              )}
              <span className="tab-slot-count">{table.selectedSlotIds.length} slots</span>
              {timetables.length > 1 && (
                <button
                  className="tab-delete-btn"
                  onClick={(e) => { e.stopPropagation(); deleteTimetable(table.id); }}
                  title="Delete timetable"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {timetables.length < MAX_TIMETABLES && (
            <button className="tab-add-btn" onClick={addTimetable} title="Add new timetable">
              +
            </button>
          )}
        </div>
        
        <div className="timetable-wrapper" style={{ '--zoom': zoom / 100 } as React.CSSProperties}>
          <table className="timetable">
            <thead>
              <tr>
                <th className="type-cell theory-header" rowSpan={2}>THEORY</th>
                <th className="timing-col">Start</th>
                <th>08:00</th><th>08:55</th><th>09:50</th><th>10:45</th><th>11:40</th><th>12:35</th>
                <th className="lunch-col">Lunch</th>
                <th>14:00</th><th>14:55</th><th>15:50</th><th>16:45</th><th>17:40</th><th>18:35</th>
              </tr>
              <tr>
                <th className="timing-col">End</th>
                <th>08:50</th><th>09:45</th><th>10:40</th><th>11:35</th><th>12:30</th><th>13:25</th>
                <th className="lunch-col">Lunch</th>
                <th>14:50</th><th>15:45</th><th>16:40</th><th>17:35</th><th>18:30</th><th>19:25</th>
              </tr>
              <tr>
                <th className="type-cell lab-header" rowSpan={2}>LAB</th>
                <th className="timing-col">Start</th>
                <th>08:00</th><th>08:50</th><th>09:50</th><th>10:40</th><th>11:40</th><th>12:30</th>
                <th className="lunch-col">Lunch</th>
                <th>14:00</th><th>14:50</th><th>15:50</th><th>16:40</th><th>17:40</th><th>18:30</th>
              </tr>
              <tr>
                <th className="timing-col">End</th>
                <th>08:50</th><th>09:40</th><th>10:40</th><th>11:30</th><th>12:30</th><th>13:20</th>
                <th className="lunch-col">Lunch</th>
                <th>14:50</th><th>15:40</th><th>16:40</th><th>17:30</th><th>18:30</th><th>19:20</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map(day => (
                <>
                  <tr key={`${day}-THEORY`}>
                    <td rowSpan={2} className="day-cell">{day}</td>
                    <td className="type-cell theory">THEORY</td>
                    {Array.from({ length: 6 }).map((_, i) => {
                      const cell = getCellContent(day, 'THEORY', i + 1);
                      return (
                        <td key={`${day}-THEORY-${i+1}`} className={`slot-cell ${cell.isSelected ? 'selected theory-slot' : ''}`}>
                          {cell.content}
                        </td>
                      );
                    })}
                    <td className="lunch-cell">Lunch</td>
                    {Array.from({ length: 6 }).map((_, i) => {
                      const cell = getCellContent(day, 'THEORY', i + 7);
                      return (
                        <td key={`${day}-THEORY-${i+7}`} className={`slot-cell ${cell.isSelected ? 'selected theory-slot' : ''}`}>
                          {cell.content}
                        </td>
                      );
                    })}
                  </tr>
                  <tr key={`${day}-LAB`}>
                    <td className="type-cell lab">LAB</td>
                    {Array.from({ length: 6 }).map((_, i) => {
                      const cell = getCellContent(day, 'LAB', i + 1);
                      return (
                        <td key={`${day}-LAB-${i+1}`} className={`slot-cell ${cell.isSelected ? 'selected lab-slot' : ''}`}>
                          {cell.content}
                        </td>
                      );
                    })}
                    <td className="lunch-cell">Lunch</td>
                    {Array.from({ length: 6 }).map((_, i) => {
                      const cell = getCellContent(day, 'LAB', i + 7);
                      return (
                        <td key={`${day}-LAB-${i+7}`} className={`slot-cell ${cell.isSelected ? 'selected lab-slot' : ''}`}>
                          {cell.content}
                        </td>
                      );
                    })}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => setZoom(prev => Math.max(prev - ZOOM_STEP, ZOOM_MIN))} disabled={zoom <= ZOOM_MIN}>−</button>
          <input
            type="range"
            className="zoom-slider"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={ZOOM_STEP}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <button className="zoom-btn" onClick={() => setZoom(prev => Math.min(prev + ZOOM_STEP, ZOOM_MAX))} disabled={zoom >= ZOOM_MAX}>+</button>
          <span className="zoom-label">{zoom}%</span>
          <button className="zoom-reset-btn" onClick={() => setZoom(100)}>Reset</button>
          <span className="zoom-hint">Ctrl + / Ctrl − / Ctrl 0</span>
        </div>
      </main>
      
      {/* Alarming Conflict Modal */}
      {conflictError && (
        <div className="modal-overlay" onClick={() => setConflictError(null)}>
          <div className="modal-content alarming-modal" onClick={e => e.stopPropagation()}>
            <div className="hazard-icon">⚠️</div>
            <h2 className="modal-title">SLOT OVERLAP DETECTED!</h2>
            <p className="modal-message">
              <span className="slot-highlight">{conflictError.attempted}</span> overlaps <span className="slot-highlight">{conflictError.existing}</span>
            </p>
            <p className="modal-subtext">You cannot select both at the same time.</p>
            <button className="modal-close-btn" onClick={() => setConflictError(null)}>ACKNOWLEDGE</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
