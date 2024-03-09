<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import { authStatus } from "../stores/auth"
    import { onMount } from "svelte";
    import { auth, db } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { doc, getDoc, setDoc } from "firebase/firestore";

    onMount(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                $authStatus = true
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    const userRef = doc(db, "users", user.uid)
                    await setDoc(
                        userRef,
                        {
                            email: user.email,
                            expenses: [],
                            incomes: []
                        },
                        { merge: true }
                    )
                }
                else {
                    const userData = docSnap.data()
                    console.log(userData)
                }
            }
            else {
                $authStatus = false
            }
        })

        return () => listen()
    })
</script>

<Navbar />
<div class="w-screen h-screen">
    <div class="mx-auto max-w-[1200px] px-5">
        <slot />
    </div>
</div>