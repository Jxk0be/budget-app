<script>
    let selection = "expense"
</script>

<div class="w-full md:h-[700px] h-full flex justify-center flex-col items-center">
    <h1 class="md:text-[35px] whitespace-nowrap text-[30px] font-bold">Let's Start Budgeting</h1>
    <form class="flex z-0 flex-col rounded-xl md:pt-0 drop-shadow-xl mt-[30px] h-[70vh] bg-[#d7d9d7] gap-[8px] max-w-[700px] w-full items-center">
        <div class="w-full whitespace-nowrap flex justify-center font-semibold text-[20px] items-center gap-x-[60px] md:gap-x-[200px]">
            <button on:click={() => selection = "expense"} class={`${selection === 'expense' ? 'underline text-blue-700' : 'hover:text-blue-700'} m-5`}>Add Expense</button>
            <button on:click={() => selection = "income"} class={`${selection === 'income' ? 'underline text-blue-700' : 'hover:text-blue-700'} m-5`}>Add Income</button>
        </div>
        {#if selection === "" || selection === "expense"}
            <div class="flex flex-col w-full justify-center items-center">
                <h1 class="pb-2 font-semibold text-xl">Category</h1>
                <div class="w-full flex justify-around items-center h-[150px] bg-slate-500">
                    <div class="w-full h-full grid grid-cols-2 md:grid-cols-3">
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Transportation</button>
                        </div>
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Food</button>
                        </div>
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Entertainment</button>
                        </div>
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Lodging</button>
                        </div>
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Bills</button>
                        </div>
                        <div class="w-full h-full border border-solid border-blue-400 flex justify-center items-center">
                            <button>Other</button>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <div>
                Income stuff
            </div>
        {/if}
    </form>
</div>

<style>
    h1, button {
        font-family: 'Poppins', sans-serif;
    }
</style>