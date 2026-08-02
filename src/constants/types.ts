export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface PublicFacility {
    id: number;
    name: string;
    icon: string;
    location: Location;
    phone_number: string;
    officer_name: string;
    officer_rank: string;
    address?: string;
  }
  
  export type PoskoCategory = 'POSKO 1' | 'POSKO 2' | 'POSKO 3' | 'POSKO 4';
  
  export type AppStateEnum = 'START' | 'OPTION' | 'LIST' | 'CARD';