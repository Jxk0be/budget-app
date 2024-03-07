<script>
    import { login } from "../stores/login"
    import { onDestroy } from "svelte";

    /* We want this to default to the login page if route switches */
    onDestroy(() => {
        $login = true
    })
</script>

<div class="w-full md:h-[700px] h-full bg-red-500">
    Register
    <button on:click={() => $login = true}>Already have an account?</button>
</div>