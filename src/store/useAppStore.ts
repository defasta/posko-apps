import { create } from 'zustand';
import { AppStateEnum, PoskoCategory, PublicFacility } from '../constants/types';
import { DUMMY_POSKO_DATA } from '../constants/dummyData';

interface AppStore {
  currentState: AppStateEnum;
  selectedCategory: PoskoCategory | null;
  searchQuery: string;
  sortOrder: 'asc' | 'desc';
  facilities: PublicFacility[];
  
  setAppState: (state: AppStateEnum) => void;
  selectCategory: (category: PoskoCategory) => void;
  setSearchQuery: (query: string) => void;
  toggleSortOrder: () => void;
  resetToStart: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentState: 'START',
  selectedCategory: null,
  searchQuery: '',
  sortOrder: 'asc',
  facilities: [],

  setAppState: (state) => set({ currentState: state }),
  
  selectCategory: (category) => {
    const list = DUMMY_POSKO_DATA[category] || [];
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    
    set({
      selectedCategory: category,
      facilities: sortedList,
      currentState: 'LIST',
      searchQuery: '',
      sortOrder: 'asc',
    });
  },

  setSearchQuery: (query) => {
    const { selectedCategory, sortOrder } = get();
    if (!selectedCategory) return;

    const baseList = DUMMY_POSKO_DATA[selectedCategory] || [];
    
    let filteredList = baseList.filter((fac) => 
      fac.name.toLowerCase().includes(query.toLowerCase())
    );

    filteredList.sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    set({ searchQuery: query, facilities: filteredList });
  },

  toggleSortOrder: () => {
    const { facilities, sortOrder } = get();
    const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    
    const sortedList = [...facilities].sort((a, b) => {
      if (nextOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    set({ sortOrder: nextOrder, facilities: sortedList });
  },

  resetToStart: () => set({
    currentState: 'START',
    selectedCategory: null,
    searchQuery: '',
    facilities: [],
  }),
}));