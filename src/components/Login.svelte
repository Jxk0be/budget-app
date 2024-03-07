<script>
    import { login } from "../stores/login"
    let email = ""
    let password = ""
    let error = false

    function handleAuthentication() {
        if (!email || !password) {
            error = true
            return
        }
        else error = false
    }
</script>

<div class="w-full md:h-[700px] h-full flex justify-center flex-col items-center">
    <form class="flex flex-col gap-[8px] max-w-[500px] w-full justify-center items-center">
        <h1 class="font-bold text-[35px]">Login</h1>
        {#if error}
            <p class="text-red-500">The info you entered is not correct</p>
        {/if}
        <label>
            <p class={`${email ? 'above' : 'center'} duration-150 transition-all ease-in-out`}>Email</p>
            <input bind:value={email} type="email" placeholder="Email" />
        </label>
        <label>
            <p class={`${password ? 'above' : 'center'} duration-150 transition-all ease-in-out`}>Password</p>
            <input bind:value={password} type="password" placeholder="Password" />
        </label>
        <button type="submit" on:click={handleAuthentication} class="w-full text-[1rem] rounded-lg p-[14px] text-white font-semibold bg-blue-500 hover:bg-blue-600 duration-300 transition-all padding-[14px]">Submit</button>
    </form>
    <button class="mt-[10px]" on:click={() => $login = false}>Don't have an account?</button>
</div>

<style>
    form {
        font-family: 'Poppins', sans-serif;
    }
    label {
        position: relative;
        border: 1px solid navy;
        border-radius: 5px;
        width: 100%;
    }
    input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 14px;
    }

    .above, .center {
        position: absolute;
        transform: translateY(-50%);
        pointer-events: none;
        color: white;
        border-radius: 4px;
        padding: 0 6px;
        font-size: 0.8rem;
    }

    .above {
        top: 0;
        left: 24px;
        background: navy;
        border: 1px solid blue;
        font-size: 0.7rem;
    }

    .center {
        top: 50%;
        left: 6px;
        border: 1px solid transparent;
        opacity: 0;
    }
</style>