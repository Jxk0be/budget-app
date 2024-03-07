<script>
    import Login from "../../components/Login.svelte";
    import Register from "../../components/Register.svelte";
    import { login } from "../../stores/login"
</script>

<div class="w-full h-screen flex justify-center items-center">
    {#if $login}
        <Login />
    {:else}
        <Register />
    {/if}
</div>