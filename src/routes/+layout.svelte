<script>
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
</script>

<Navbar />
<div class="pt-[60px] md:pt-[70px] w-screen h-screen">
    <div class="mx-auto max-w-[1200px] px-5">
        <slot />
    </div>
</div>