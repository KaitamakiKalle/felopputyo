import { writable } from 'svelte/store';

const orderInfo = writable({
  name: '',
  phone: '',
  email: '',
  adress: '',
  moreInfo: '',
});

export default orderInfo;
