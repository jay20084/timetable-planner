export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
export type SlotType = 'THEORY' | 'LAB';

export interface GridCell {
  day: Day;
  type: SlotType;
  col: number; // 1-12
  span?: number;
}

export interface SlotOption {
  id: string; // e.g. "A1", "L1"
  label: string; // e.g. "A1", "L1"
  cells: GridCell[];
  category: 'THEORY' | 'LAB';
}

export const AVAILABLE_SLOTS: SlotOption[] = [
  // MONDAY THEORY
  { id: 'A1', label: 'A1 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 1 }, { day: 'WED', type: 'THEORY', col: 2 }] },
  { id: 'F1', label: 'F1 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 2 }, { day: 'WED', type: 'THEORY', col: 3 }] },
  { id: 'D1', label: 'D1 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 3 }, { day: 'THU', type: 'THEORY', col: 1 }] },
  { id: 'TB1', label: 'TB1 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 4 }] },
  { id: 'TG1', label: 'TG1 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 5 }] },
  { id: 'A2', label: 'A2 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 7 }, { day: 'WED', type: 'THEORY', col: 8 }] },
  { id: 'F2', label: 'F2 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 8 }, { day: 'WED', type: 'THEORY', col: 9 }] },
  { id: 'D2', label: 'D2 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 9 }, { day: 'THU', type: 'THEORY', col: 7 }] },
  { id: 'TB2', label: 'TB2 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 10 }] },
  { id: 'TG2', label: 'TG2 (Theory)', category: 'THEORY', cells: [{ day: 'MON', type: 'THEORY', col: 11 }] },

  // TUESDAY THEORY
  { id: 'B1', label: 'B1 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 1 }, { day: 'THU', type: 'THEORY', col: 2 }] },
  { id: 'G1', label: 'G1 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 2 }, { day: 'THU', type: 'THEORY', col: 3 }] },
  { id: 'E1', label: 'E1 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 3 }, { day: 'FRI', type: 'THEORY', col: 1 }] },
  { id: 'TC1', label: 'TC1 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 4 }] },
  { id: 'TAA1', label: 'TAA1 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 5 }] },
  { id: 'B2', label: 'B2 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 7 }, { day: 'THU', type: 'THEORY', col: 8 }] },
  { id: 'G2', label: 'G2 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 8 }, { day: 'THU', type: 'THEORY', col: 9 }] },
  { id: 'E2', label: 'E2 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 9 }, { day: 'FRI', type: 'THEORY', col: 7 }] },
  { id: 'TC2', label: 'TC2 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 10 }] },
  { id: 'TAA2', label: 'TAA2 (Theory)', category: 'THEORY', cells: [{ day: 'TUE', type: 'THEORY', col: 11 }] },

  // WEDNESDAY THEORY (Remaining)
  { id: 'C1', label: 'C1 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 1 }, { day: 'FRI', type: 'THEORY', col: 2 }] },
  { id: 'TD1', label: 'TD1 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 4 }] },
  { id: 'TBB1', label: 'TBB1 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 5 }] },
  { id: 'C2', label: 'C2 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 7 }, { day: 'FRI', type: 'THEORY', col: 8 }] },
  { id: 'TD2', label: 'TD2 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 10 }] },
  { id: 'TBB2', label: 'TBB2 (Theory)', category: 'THEORY', cells: [{ day: 'WED', type: 'THEORY', col: 11 }] },
  
  // THURSDAY THEORY (Remaining)
  { id: 'TE1', label: 'TE1 (Theory)', category: 'THEORY', cells: [{ day: 'THU', type: 'THEORY', col: 4 }] },
  { id: 'TCC1', label: 'TCC1 (Theory)', category: 'THEORY', cells: [{ day: 'THU', type: 'THEORY', col: 5 }] },
  { id: 'TE2', label: 'TE2 (Theory)', category: 'THEORY', cells: [{ day: 'THU', type: 'THEORY', col: 10 }] },
  { id: 'TCC2', label: 'TCC2 (Theory)', category: 'THEORY', cells: [{ day: 'THU', type: 'THEORY', col: 11 }] },

  // FRIDAY THEORY (Remaining)
  { id: 'TA1', label: 'TA1 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 3 }] },
  { id: 'TF1', label: 'TF1 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 4 }] },
  { id: 'TDD1', label: 'TDD1 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 5 }] },
  { id: 'TA2', label: 'TA2 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 9 }] },
  { id: 'TF2', label: 'TF2 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 10 }] },
  { id: 'TDD2', label: 'TDD2 (Theory)', category: 'THEORY', cells: [{ day: 'FRI', type: 'THEORY', col: 11 }] },

  // LAB SLOTS
  { id: 'L1-L2', label: 'L1+L2 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 1 }, { day: 'MON', type: 'LAB', col: 2 }] },
  { id: 'L3-L4', label: 'L3+L4 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 3 }, { day: 'MON', type: 'LAB', col: 4 }] },
  { id: 'L5-L6', label: 'L5+L6 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 5 }, { day: 'MON', type: 'LAB', col: 6 }] },
  
  { id: 'L31-L32', label: 'L31+L32 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 7 }, { day: 'MON', type: 'LAB', col: 8 }] },
  { id: 'L33-L34', label: 'L33+L34 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 9 }, { day: 'MON', type: 'LAB', col: 10 }] },
  { id: 'L35-L36', label: 'L35+L36 (Lab)', category: 'LAB', cells: [{ day: 'MON', type: 'LAB', col: 11 }, { day: 'MON', type: 'LAB', col: 12 }] },

  { id: 'L7-L8', label: 'L7+L8 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 1 }, { day: 'TUE', type: 'LAB', col: 2 }] },
  { id: 'L9-L10', label: 'L9+L10 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 3 }, { day: 'TUE', type: 'LAB', col: 4 }] },
  { id: 'L11-L12', label: 'L11+L12 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 5 }, { day: 'TUE', type: 'LAB', col: 6 }] },

  { id: 'L37-L38', label: 'L37+L38 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 7 }, { day: 'TUE', type: 'LAB', col: 8 }] },
  { id: 'L39-L40', label: 'L39+L40 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 9 }, { day: 'TUE', type: 'LAB', col: 10 }] },
  { id: 'L41-L42', label: 'L41+L42 (Lab)', category: 'LAB', cells: [{ day: 'TUE', type: 'LAB', col: 11 }, { day: 'TUE', type: 'LAB', col: 12 }] },

  { id: 'L13-L14', label: 'L13+L14 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 1 }, { day: 'WED', type: 'LAB', col: 2 }] },
  { id: 'L15-L16', label: 'L15+L16 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 3 }, { day: 'WED', type: 'LAB', col: 4 }] },
  { id: 'L17-L18', label: 'L17+L18 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 5 }, { day: 'WED', type: 'LAB', col: 6 }] },

  { id: 'L43-L44', label: 'L43+L44 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 7 }, { day: 'WED', type: 'LAB', col: 8 }] },
  { id: 'L45-L46', label: 'L45+L46 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 9 }, { day: 'WED', type: 'LAB', col: 10 }] },
  { id: 'L47-L48', label: 'L47+L48 (Lab)', category: 'LAB', cells: [{ day: 'WED', type: 'LAB', col: 11 }, { day: 'WED', type: 'LAB', col: 12 }] },

  { id: 'L19-L20', label: 'L19+L20 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 1 }, { day: 'THU', type: 'LAB', col: 2 }] },
  { id: 'L21-L22', label: 'L21+L22 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 3 }, { day: 'THU', type: 'LAB', col: 4 }] },
  { id: 'L23-L24', label: 'L23+L24 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 5 }, { day: 'THU', type: 'LAB', col: 6 }] },

  { id: 'L49-L50', label: 'L49+L50 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 7 }, { day: 'THU', type: 'LAB', col: 8 }] },
  { id: 'L51-L52', label: 'L51+L52 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 9 }, { day: 'THU', type: 'LAB', col: 10 }] },
  { id: 'L53-L54', label: 'L53+L54 (Lab)', category: 'LAB', cells: [{ day: 'THU', type: 'LAB', col: 11 }, { day: 'THU', type: 'LAB', col: 12 }] },

  { id: 'L25-L26', label: 'L25+L26 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 1 }, { day: 'FRI', type: 'LAB', col: 2 }] },
  { id: 'L27-L28', label: 'L27+L28 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 3 }, { day: 'FRI', type: 'LAB', col: 4 }] },
  { id: 'L29-L30', label: 'L29+L30 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 5 }, { day: 'FRI', type: 'LAB', col: 6 }] },

  { id: 'L55-L56', label: 'L55+L56 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 7 }, { day: 'FRI', type: 'LAB', col: 8 }] },
  { id: 'L57-L58', label: 'L57+L58 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 9 }, { day: 'FRI', type: 'LAB', col: 10 }] },
  { id: 'L59-L60', label: 'L59+L60 (Lab)', category: 'LAB', cells: [{ day: 'FRI', type: 'LAB', col: 11 }, { day: 'FRI', type: 'LAB', col: 12 }] },
];

export const DAYS: Day[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
