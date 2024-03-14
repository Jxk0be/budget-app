<script>
    import { onMount } from 'svelte';
    import { auth } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import Chart from 'chart.js/auto';
    import { currencyConverter } from "$lib/api/CurrencyConverter";
    import { exchangeRate } from "../../stores/currency"

    let type = "yen"
    let inputValue = ""
    let invalidFormatError = false
    let conversionResult = null

    onMount(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (!user) goto("/auth")
        })

        return () => listen()
    })

    const handleType = (switchTo) => {
        type = switchTo
        inputValue = ""
        conversionResult = null
    }

    function isValidUSD(amount) {
        var regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(amount);
    }

    function isValidYen(amount) {
        var regex = /^\d+$/;
        return regex.test(amount);
    }

    const handleConversion = async () => {
        if (!inputValue || (type === "usd" && !isValidUSD(inputValue)) || (type === "yen" && !isValidYen(inputValue))) {
            invalidFormatError = true
            return
        }
        else invalidFormatError = false

        inputValue = Number(inputValue)
        if (type === "yen") {
            if ($exchangeRate.type !== "jpy" || $exchangeRate.route !== "converter") {
                $exchangeRate.amount = await currencyConverter("jpy", "usd")
                $exchangeRate.type = "jpy"
                $exchangeRate.route = "converter"
            }
            conversionResult = (inputValue * $exchangeRate.amount).toFixed(2)
        }
        else if (type === "usd") {
            if ($exchangeRate.type !== "usd" || $exchangeRate.route !== "converter") {
                $exchangeRate.amount = await currencyConverter("usd", "jpy")
                $exchangeRate.type = "usd"
                $exchangeRate.route = "converter"
            }
            conversionResult = Math.floor((inputValue * $exchangeRate.amount))
        }
    }
</script>

{#if invalidFormatError}
    <div class="absolute top-0 right-0 flex justify-center items-center mx-auto pt-[95px] w-full">
        <p class="text-white bg-red-500 p-3 rounded-md">Invalid format, please try again</p>
    </div>
{/if}

<div class="w-full h-screen md:pt-0 pt-[90px] flex justify-center items-center flex-col">
    <h1 class="font-bold whitespace-nowrap text-3xl">Currency Converter</h1>
    <form class="flex z-0 flex-col rounded-xl pb-5 md:pt-0 drop-shadow-xl md:min-w-[500px] mt-[30px] gap-[8px] h-auto max-w-[700px] w-full items-center">
        <div class="flex flex-col w-full justify-center items-center">
            <h1 class="pb-2 font-semibold text-xl">Type</h1>
            <div class="w-full flex justify-around items-center h-[60px] ">
                <div class="w-full h-full grid grid-cols-2 min-w-[300px]">
                    <button on:click={() => handleType("yen")}>
                        <div class={`${type === "yen" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            Yen --> USD
                        </div>
                    </button>
                    <button on:click={() => handleType("usd")}>
                        <div class={`${type === "usd" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            USD --> Yen
                        </div>
                    </button>
                </div>
            </div>

            <h1 class="pb-2 pt-2 font-semibold text-xl">Amount</h1>
            <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                    <input bind:value={inputValue} class="w-full p-4" type="text" placeholder={`${type === "usd" ? '$23.00' : '¥2300'}`} />
                </div>
            </div>
            <button on:click={handleConversion} class="w-full z-10 mt-[20px] font-semibold text-xl p-[14px] bg-white flex justify-center items-center">
                Convert Currency
            </button>

            {#if conversionResult}
                <h1 class="md:bottom-[-20px] bottom-[10px] z-0 absolute text-3xl md:pt-[90px] font-bold">{type === "yen" ? `$${conversionResult}` : `¥${conversionResult}`}</h1>
            {/if}
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