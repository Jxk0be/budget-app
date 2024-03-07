<script>
    import { login } from "../stores/login"
</script>

<div class="w-full md:h-[700px] h-full bg-red-500 flex justify-center flex-col items-center">
    <form class="flex flex-col gap-[8px] w-[400px] justify-center items-center">
        <h1>Login</h1>
        <label>
            <input type="email" placeholder="email" />
        </label>
        <label>
            <input type="password" placeholder="password" />
        </label>
        <label>
            <input type="password" placeholder="confirm password" />
        </label>
    </form>
    <button on:click={() => $login = false}>Don't have an account?</button>
</div>