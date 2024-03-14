<script>
    import { onMount } from 'svelte';
    import { auth } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import Chart from 'chart.js/auto';
    import { currencyConverter } from "$lib/api/CurrencyConverter";
    import { exchangeRate } from "../../stores/currency"

    let type = "yen"
    onMount(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (!user) goto("/auth")
        })

        return () => listen()
    })
</script>

<div class="w-full h-screen pt-[90px] flex justify-center items-center flex-col">
    <h1 class="font-bold text-3xl">Currency Converter</h1>
    <form class="flex z-0 flex-col rounded-xl pb-5 md:pt-0 drop-shadow-xl md:min-w-[500px] mt-[30px] gap-[8px] h-auto max-w-[700px] w-full items-center">
        <div class="flex flex-col w-full justify-center items-center">
            <h1 class="pb-2 font-semibold text-xl">Type</h1>
            <div class="w-full flex justify-around items-center h-[60px] ">
                <div class="w-full h-full grid grid-cols-2 min-w-[300px]">
                    <button on:click={() => type = "yen"}>
                        <div class={`${type === "yen" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            Yen
                        </div>
                    </button>
                    <button on:click={() => type = "usd"}>
                        <div class={`${type === "usd" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            USD
                        </div>
                    </button>
                </div>
            </div>

            <h1 class="pb-2 pt-2 font-semibold text-xl">Amount</h1>
            <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                    <input class="w-full p-4" type="text" placeholder="" />
                </div>
            </div>
            <button class="w-full mt-[20px] font-semibold text-xl p-[14px] bg-white flex justify-center items-center">
                Convert Currency
            </button>
        </div>
    </form>   
</div>

<style>
    h1, button, div {
        font-family: 'Poppins', sans-serif;
    }
    input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 14px;
    }
</style>