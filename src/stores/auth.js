import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "$lib/firebase/firebase"
import { writable } from 'svelte/store';

export const authStatus = writable(false)

export const authHandlers = {
    signUp: async (email, pass) => {
        await createUserWithEmailAndPassword(auth, email, pass)
    },
    google: async () => {
        await signInWithPopup(auth, googleProvider)
    },
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },
    logout: async () => {
        await signOut(auth)
    }
}