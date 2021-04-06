import { readable } from 'svelte/store';

const tuotteet = readable([
  {
    tuotenumero: 0,
    tuote: 'Kasvomaski',
    hinta: 1,
  },
  {
    tuotenumero: 1,
    tuote: 'Kasvomaski-paketti',
    hinta: 15,
  },
  {
    tuotenumero: 2,
    tuote: 'Pieni käsidesi',
    hinta: 4,
  },
  {
    tuotenumero: 3,
    tuote: 'Iso käsidesi',
    hinta: 10,
  },
]);

export default tuotteet;
