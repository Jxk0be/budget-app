<script>
    import Entry from "../lib/components/Entry.svelte";
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

<div class="w-full pt-[90px] md:pt-0 items-center flex flex-col h-screen justify-center">
    <Entry />
</div>