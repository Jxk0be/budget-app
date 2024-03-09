<script>
    import { onMount } from 'svelte';
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase/firebase";
    import { goto } from "$app/navigation";

    onMount(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (!user) goto("/auth")
        })

        return () => listen()
    })
</script>
<div class="w-full h-screen pt-[90px]">
    history page
</div>