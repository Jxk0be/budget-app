import { writable } from 'svelte/store';

export const exchangeRate = writable({
    type: "yen",
    amount: null,
    route: null
})