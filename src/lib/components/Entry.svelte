<script>
    let selection = "expense"
    let currency = "usd"
    let category = "transportation"
</script>

<div class="w-full md:h-[700px] mt-[-90px] md:mt-0 h-full flex justify-center flex-col items-center">
    <h1 class="md:text-[35px] whitespace-nowrap text-[30px] font-bold">Let's Start Budgeting</h1>
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

                <h1 class="pb-2 pt-2 font-semibold text-xl">Amount</h1>
                <div class="w-full gap-x-1 flex justify-center items-center h-[75px] ">
                    <button on:click={() => currency = "usd"} class={`${currency === "usd" ? 'underline text-blue-700' : ''} w-[100px] font-semibold text-xl h-full bg-white flex justify-center items-center`}>
                        USD
                    </button>
                    <button on:click={() => currency = "yen"} class={`${currency === "yen" ? 'underline text-blue-700' : ''} w-[100px] font-semibold text-xl h-full bg-white flex justify-center items-center`}>
                        Yen
                    </button>

                    <div class="w-full font-semibold text-xl h-full bg-white flex justify-center items-center">
                        <input class="w-full p-4" type="text" placeholder={`${currency === 'usd' ? '$23.00...' : '¥2300...'}`} />
                    </div>
                </div>
                <button class="w-full mt-[20px] font-semibold text-xl p-[14px] bg-white flex justify-center items-center">
                    Add Expense
                </button>
            </div>
        {:else}
            <div>
                Income stuff
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