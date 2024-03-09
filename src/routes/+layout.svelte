<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import { authStatus } from "../stores/auth"
    import { onMount } from "svelte";
    import { auth } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";

    onMount(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                $authStatus = true
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