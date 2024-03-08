import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "$lib/firebase/firebase"
import { writable } from 'svelte/store';

export const authStore = writable({
    user: null,
    loading: true,
    data: null
})

export const authHandlers = {
    signUp: async (email, pass) => {
        await createUserWithEmailAndPassword(auth, email, pass)
    },
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },
    logout: async () => {
        await signOut(auth)
    }
}