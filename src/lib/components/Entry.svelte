<script>
    let selection = "expense"
</script>

<div class="w-full md:h-[700px] h-full flex justify-center flex-col items-center">
    <h1 class="md:text-[35px] whitespace-nowrap text-[30px] font-bold">Let's Start Budgeting</h1>
    <form class="flex z-0 flex-col rounded-xl md:pt-0 drop-shadow-xl mt-[30px] h-[70vh] bg-[#d7d9d7] gap-[8px] max-w-[700px] w-full items-center">
        <div class="w-full whitespace-nowrap flex justify-center font-semibold text-[20px] items-center gap-x-[60px] md:gap-x-[200px]">
            <button on:click={() => selection = "expense"} class={`${selection === 'expense' ? 'underline text-blue-700' : ''} m-5`}>Add Expense</button>
            <button on:click={() => selection = "income"} class={`${selection === 'income' ? 'underline text-blue-700' : ''} m-5`}>Add Income</button>
        </div>
        {#if selection === "" || selection === "expense"}
            <div>
                Expense stuff
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