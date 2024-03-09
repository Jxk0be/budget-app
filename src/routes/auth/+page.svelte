<script>
    import Login from "$lib/components/Login.svelte";
    import Register from "$lib/components/Register.svelte";
    import { login } from "../../stores/login"
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation"
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase/firebase";

    onMount(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) goto("/")
        })

        return () => listen()
    })
</script>

<div class="w-full h-screen flex justify-center items-center">
    {#if $login}
        <Login />
    {:else}
        <Register />
    {/if}
</div>