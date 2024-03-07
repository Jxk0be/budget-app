<script>
    import Icon from '@iconify/svelte';

    let menuOpen = false;

    const handleClose = () => {
        menuOpen = false
        if (document.body.classList.contains("noScroll")) {
            document.body.classList.remove("noScroll")
        }
    }

    const handleMenu = () => {
        menuOpen = !menuOpen

        if (document.body.classList.contains("noScroll")) {
            document.body.classList.remove("noScroll")
        }
        else {
            document.body.classList.add("noScroll")
        }
    }
</script>

<div class="w-screen fixed bg-[#041d22] h-[90px] z-40 flex justify-center">
    <div class="w-full centered text-white flex justify-between items-center h-[90px] fixed max-w-[1200px] px-5">
        <a class="font-bold text-xl" href="/" on:click={() => handleClose()}>
            <h1>Budget Buddy </h1>
        </a>
        <ul class="lg:flex hidden text-xl font-semibold">
            <a href="/" on:click={() => handleClose()}><li class="px-4 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Home</li></a>
            <a href="stats" on:click={() => handleClose()}><li class="px-4 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Stats</li></a>
            <a href="history" on:click={() => handleClose()}><li class="px-4 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">History</li></a>
            <a href="auth" on:click={() => handleClose()}><li class="pl-4 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Login</li></a>
        </ul>
    
        <!-- Hamburger menu -->
        <button class={`lg:hidden text-[35px] p-3 transition-all ease-in-out rounded-xl duration-150 ${!menuOpen ? '' : 'bg-[#0b0b0b]'}`} on:click={() => handleMenu()} >
            <Icon icon="lucide:menu" />
        </button>
    </div>
</div>

{#if menuOpen}
    <button class={`${menuOpen ? 'left-0' : 'left-[-100%]'} lg:hidden overflow-x-hidden overflow-y-hidden w-full cursor-auto h-screen fixed top-0 left-0 bg-gray-900/50`} on:click={() => handleMenu()}></button>
{/if}

<div class={`transition-all z-30 text-[125%] uppercase bg-[#0b0b0b] font-semibold min-w-[250px] text-white lg:hidden ease-in-out duration-150 ${menuOpen ? 'right-0' : 'md:right-[-40%] right-[-250px]'} fixed pt-[90px] w-[250px] top-0 md:w-[40%] h-full border-l border-gray-600`}>
    <ul class="text-left font-bold">
        <a href="/" on:click={() => handleClose()}>
            <li class="p-5 border-b border-gray-600 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Home</li>
        </a>
        <a href="stats" on:click={() => handleClose()}>
            <li class="p-5 border-b border-gray-600 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Stats</li>
        </a>
        <a href="history" on:click={() => handleClose()}>
            <li class="p-5 border-b border-gray-600 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">History</li>
        </a>
        <a href="auth" on:click={() => handleClose()}>
            <li class="p-5 border-b border-gray-600 duration-150 ease-in-out transition-all hover:text-[#38c5fd]">Login</li>
        </a>
    </ul>
</div>