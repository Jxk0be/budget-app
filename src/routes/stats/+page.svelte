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

    // Currency conversion API
    // Source of truth: https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file
    // Example: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
        // returns obj of currency objects and what $1 usd is worth in their currency
        // example: $1 usd is 147.84... in "jpy"
        // res = res.json()
        // res.usd <== that's the object with all currencies
        // res.usd.jpy <=== would be yen conversion
</script>
<div class="w-full h-screen pt-[90px]">
    stats page
</div>