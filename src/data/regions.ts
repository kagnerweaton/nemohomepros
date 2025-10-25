export interface Region {
  id: string;
  name: string;
  cities: string[];
  color: string;
  hoverColor: string;
  borderColor: string;
  coords: { top: string; left: string };
  location: { lat: number; lon: number };
}

const uniformColor = {
  color: 'rgba(250, 204, 21, 0.5)', // yellow-400 with 50% opacity
  hoverColor: 'rgba(250, 204, 21, 0.75)', // yellow-400 with 75% opacity
  borderColor: '#EAB308', // yellow-500
};

export const regions: Region[] = [
  {
    id: 'chillicothe',
    name: 'Chillicothe',
    cities: ['Chillicothe', 'Trenton', 'Gallatin', 'Jamesport'],
    ...uniformColor,
    coords: { top: '55%', left: '25%' },
    location: { lat: 39.7931, lon: -93.5266 },
  },
  {
    id: 'hannibal',
    name: 'Hannibal',
    cities: ['Hannibal', 'Monroe City', 'Palmyra', 'New London'],
    ...uniformColor,
    coords: { top: '60%', left: '80%' },
    location: { lat: 39.7084, lon: -91.3585 },
  },
  {
    id: 'kirksville',
    name: 'Kirksville',
    cities: ['Kirksville', 'La Plata', 'Novinger', 'Greentop'],
    ...uniformColor,
    coords: { top: '35%', left: '50%' },
    location: { lat: 40.1948, lon: -92.5832 },
  },
  {
    id: 'moberly',
    name: 'Moberly',
    cities: ['Moberly', 'Madison', 'Cairo', 'Huntsville'],
    ...uniformColor,
    coords: { top: '80%', left: '55%' },
    location: { lat: 39.4189, lon: -92.4385 },
  },
];

export const serviceAreas = regions.map(r => r.name);
