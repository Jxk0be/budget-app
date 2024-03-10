<script>
    import { userInstance } from "../../stores/auth"
    import { db } from "$lib/firebase/firebase";
    import { doc, getDoc, setDoc } from "firebase/firestore";

    let selection = "expense"
    let currency = "usd"
    let category = "transportation"
    let type = "paycheck"
    let amount = ""
    let desc = ""
    let incomeAmount = ""
    let incomeDesc = ""
    let invalidFormatError = false
    let invalidDescLengthError = false

    // We want to make sure that income is always in USD
    $: if (selection === "income") {
        currency = "usd"
    }

    function isValidUSD(amount) {
        // Regular expression to match the format <digits> or <digits>.<2 digits max>
        var regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(amount);
    }

    function isValidYen(amount) {
        // Regular expression to match the format <digits> without ¥ symbol
        var regex = /^\d+$/;
        return regex.test(amount);
    }

    const handleExpense = async () => {
        if (!amount || !desc || (currency === "usd" && !isValidUSD(amount)) || (currency === "yen" && !isValidYen(amount))) {
            invalidFormatError = true
            invalidDescLengthError = false
            return
        }
        else if (desc.length > 250) {
            invalidDescLengthError = true
            invalidFormatError = false
            return
        }
        else {
            invalidFormatError = false
            invalidDescLengthError = false
        }


        let expenseData = {
            currency: currency,
            category: category,
            amount: amount,
            description: desc
        }

        try {
            const userRef = doc(db, "users", $userInstance?.user?.uid)
            const docSnap = await getDoc(userRef)
            const userData = docSnap.data()
            let expenses = userData?.expenses || []
            await setDoc(
                userRef,
                {
                    expenses: [...expenses, expenseData]
                },
                { merge: true }
            )
        }
        catch(error) {
            console.log(error)
        }

        amount = ""
        desc = ""
        selection = "expense"
        currency = "usd"
        category = "transportation"
    }

    const handleIncome = async () => {
        if (!incomeAmount|| !incomeDesc || (currency === "usd" && !isValidUSD(incomeAmount))) {
            invalidFormatError = true
            invalidDescLengthError = false
            return
        }
        else if (incomeDesc.length > 250) {
            invalidDescLengthError = true
            invalidFormatError = false
            return
        }
        else {
            invalidDescLengthError = false
            invalidFormatError = false
        }

        let incomeData = {
            type: type,
            amount: incomeAmount,
            description: incomeDesc
        }

        try {
            const userRef = doc(db, "users", $userInstance?.user?.uid)
            const docSnap = await getDoc(userRef)
            const userData = docSnap.data()
            let income = userData?.income || []
            await setDoc(
                userRef,
                {
                    income: [...income, incomeData]
                },
                { merge: true }
            )
        }
        catch(error) {
            console.log(error)
        }

        type = "paycheck"
        incomeAmount = ""
        incomeDesc = ""
    }
</script>

<div class="w-full md:h-[700px] mt-[-30px] md:mt-[70px] h-full flex justify-center flex-col items-center">
    <h1 class="md:text-[35px] whitespace-nowrap text-[30px] font-bold">Let's Start Budgeting</h1>
    {#if invalidFormatError}
        <p class="text-white bg-red-500 p-3 rounded-md">Invalid format, please try again</p>
    {/if}
    {#if invalidDescLengthError}
        <p class="text-white bg-red-500 p-3 rounded-md">Description must not exceed 250 characters</p>
    {/if}
    <form class="flex z-0 flex-col rounded-xl pb-5 md:pt-0 drop-shadow-xl md:min-w-[500px] mt-[30px] gap-[8px] h-auto max-w-[700px] w-full items-center">
        <div class="w-full whitespace-nowrap flex justify-center font-semibold text-[20px] items-center gap-x-[60px] md:gap-x-[200px]">
            <button on:click={() => selection = "expense"} class={`${selection === 'expense' ? 'underline text-blue-700' : 'hover:text-blue-700'} m-5`}>Add Expense</button>
            <button on:click={() => selection = "income"} class={`${selection === 'income' ? 'underline text-blue-700' : 'hover:text-blue-700'} m-5`}>Add Income</button>
        </div>
        {#if selection === "" || selection === "expense"}
            <div class="flex flex-col w-full justify-center items-center">
                <h1 class="pb-2 font-semibold text-xl">Category</h1>
                <div class="w-full flex justify-around items-center h-[150px] ">
                    <div class="w-full h-full grid grid-cols-2 md:grid-cols-3 min-w-[300px]">
                        <button on:click={() => category = "transportation"}>
                            <div class={`${category === "transportation" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Transportation
                            </div>
                        </button>
                        <button on:click={() => category = "food"}>
                            <div class={`${category === "food" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Food
                            </div>
                        </button>
                        <button on:click={() => category = "entertainment"}>
                            <div class={`${category === "entertainment" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Entertainment
                            </div>
                        </button>
                        <button on:click={() => category = "lodging"}>
                            <div class={`${category === "lodging" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Lodging
                            </div>
                        </button>
                        <button on:click={() => category = "bills"}>
                            <div class={`${category === "bills" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Bills
                            </div>
                        </button>
                        <button on:click={() => category = "other"}>
                            <div class={`${category === "other" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                                Other
                            </div>
                        </button>
                    </div>
                </div>

                <h1 class="pb-2 pt-2 font-semibold text-xl">Description</h1>
                <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                    <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                        <input bind:value={desc} class="w-full p-4" type="text" placeholder="Groceries..." />
                    </div>
                </div>

                <h1 class="pb-2 pt-2 font-semibold text-xl">Amount</h1>
                <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                    <button on:click={() => currency = "usd"} class={`${currency === "usd" ? 'underline text-blue-700' : ''} w-[100px] font-semibold text-xl h-full bg-white flex justify-center items-center`}>
                        USD
                    </button>
                    <button on:click={() => currency = "yen"} class={`${currency === "yen" ? 'underline text-blue-700' : ''} w-[100px] font-semibold text-xl h-full bg-white flex justify-center items-center`}>
                        Yen
                    </button>

                    <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                        <input bind:value={amount} class="w-full p-4" type="text" placeholder={`${currency === 'usd' ? '$23.00...' : '¥2300...'}`} />
                    </div>
                </div>
                <button on:click={handleExpense} class="w-full mt-[20px] font-semibold text-xl p-[14px] bg-white flex justify-center items-center">
                    Add Expense
                </button>
            </div>
        {:else}
        <div class="flex flex-col w-full justify-center items-center">
            <h1 class="pb-2 font-semibold text-xl">Type</h1>
            <div class="w-full flex justify-around items-center h-[60px] ">
                <div class="w-full h-full grid grid-cols-2 min-w-[300px]">
                    <button on:click={() => type = "paycheck"}>
                        <div class={`${type === "paycheck" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            Paycheck
                        </div>
                    </button>
                    <button on:click={() => type = "random"}>
                        <div class={`${type === "random" ? 'underline text-blue-700' : ''} w-full h-full border rounded-xl flex justify-center items-center`}>
                            Random
                        </div>
                    </button>
                </div>
            </div>

            <h1 class="pb-2 pt-2 font-semibold text-xl">Description</h1>
            <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                    <input bind:value={incomeDesc} class="w-full p-4" type="text" placeholder="Groceries..." />
                </div>
            </div>

            <h1 class="pb-2 pt-2 font-semibold text-xl">Amount</h1>
            <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                    <input bind:value={incomeAmount} class="w-full p-4" type="text" placeholder={`${currency === 'usd' ? '$23.00...' : '¥2300...'}`} />
                </div>
            </div>
            <button on:click={handleIncome} class="w-full mt-[20px] font-semibold text-xl p-[14px] bg-white flex justify-center items-center">
                Add Income
            </button>
        </div>
        {/if}
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