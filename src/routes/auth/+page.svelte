<script>
    import Login from "$lib/components/Login.svelte";
    import Register from "$lib/components/Register.svelte";
    import { login } from "../../stores/login"
</script>

<div class="w-full h-screen flex justify-center items-center">
    {#if $login}
        <Login />
    {:else}
        <Register />
    {/if}
</div>