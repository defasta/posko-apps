import { PublicFacility, PoskoCategory } from './types';

export const DUMMY_POSKO_DATA: Record<PoskoCategory, PublicFacility[]> = {
  'POSKO 1': [
    {
      id: 1,
      name: 'POS TERPADU REST AREA KM-57 TOL JAPEK',
      icon: 'shield-star',
      location: { latitude: -6.3551, longitude: 107.2881 },
      phone_number: '08111222333',
      officer_name: 'Budi Santoso',
      officer_rank: 'IPDA',
    },
    {
      id: 2,
      name: 'POS TERPADU CIKOPO',
      icon: 'shield-home',
      location: { latitude: -6.4421, longitude: 107.4581 },
      phone_number: '08129876543',
      officer_name: 'Siti Aminah',
      officer_rank: 'AIPTU',
    },
  ],
  'POSKO 2': [
    {
      id: 3,
      name: 'POS PENGAMANAN TEBET ECO PARK',
      icon: 'shield-account',
      location: { latitude: -6.2366, longitude: 106.8535 },
      phone_number: '08134567890',
      officer_name: 'Andi Wijaya',
      officer_rank: 'BRIPKA',
    },
  ],
  'POSKO 3': [
    {
      id: 4,
      name: 'POS PELAYANAN KELAPA GADING',
      icon: 'shield-plus',
      location: { latitude: -6.1578, longitude: 106.9080 },
      phone_number: '08198765432',
      officer_name: 'Rina Marlina',
      officer_rank: 'BRIPTU',
    },
  ],
  'POSKO 4': [
    {
      id: 5,
      name: 'POS PANTAU BUNDARAN HI',
      icon: 'shield-eye',
      location: { latitude: -6.1949, longitude: 106.8230 },
      phone_number: '08155544433',
      officer_name: 'Dodi Hermawan',
      officer_rank: 'KOMPOL',
    },
  ],
};