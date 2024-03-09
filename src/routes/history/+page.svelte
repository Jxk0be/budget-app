<script>
    import { onMount } from 'svelte';
    import { onAuthStateChanged } from "firebase/auth";
    import { auth, db } from "$lib/firebase/firebase";
    import { goto } from "$app/navigation";
    import { doc, getDoc } from "firebase/firestore";

    onMount(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (!user) goto("/auth")
        })

        return () => listen()
    })
</script>
<div class="w-full h-screen pt-[90px]">
    history page
</div>