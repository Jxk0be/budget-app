<script>
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
</script>

<Navbar />
<div class="w-screen h-screen">
    <div class="mx-auto max-w-[1200px] px-5">
        <slot />
    </div>
</div>