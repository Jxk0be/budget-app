<script>
    import { onMount } from 'svelte';
    import { auth, db } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { doc, getDoc } from "firebase/firestore";
    import { goto } from "$app/navigation";
    import Chart from 'chart.js/auto';
    import { currencyConverter } from "$lib/api/CurrencyConverter";
    import { exchangeRate } from "../../stores/currency"

    let expenses = []
    let income = []

    onMount(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const userData = docSnap.data()
                    expenses = userData.expenses
                    income = userData.income
                }

                if (expenses.length > 0) {
                    for (let i = 0; i < expenses?.length; ++i) {
                        expenses[i].amount = Number(expenses[i].amount)
                        if (expenses[i].currency === "yen" && $exchangeRate.amount === null) {
                            $exchangeRate.amount = await currencyConverter("jpy", "usd")
                            $exchangeRate.type = "jpy"
                            $exchangeRate.route = "stats"
                        }
                        if (expenses[i].currency === "yen") {
                            expenses[i].amount = Number((expenses[i].amount * $exchangeRate.amount).toFixed(2))
                        }
                    }

                    expenses = expenses.map((exp) => {
                        return {
                            category: exp.category,
                            amount: exp.amount
                        }
                    })

                    const tracker = {}
                    expenses.forEach((exp) => {
                        if (exp.category in tracker) tracker[exp.category] += exp.amount
                        else tracker[exp.category] = exp.amount
                    })

                    const data = {
                        labels: Object.keys(tracker),
                        datasets: [{
                            label: "amount spent",
                            data: Object.values(tracker),
                            borderWidth: 1
                        }]
                    }

                    let ctx = document.getElementById("pie")
                    const chart = new Chart(ctx, {
                        type: 'pie',
                        data: data,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }
            }
            else goto("/auth")
        })


        return () => listen()
    })
</script>

<div class="w-full h-screen pt-[90px] md:pt-0 flex justify-center items-center flex-col">
    {#if expenses.length === 0}
        <h1 class="font-semibold text-md text-red-500">**Add entries to see a breakdown**</h1>
    {/if}
    <h1 class="font-bold text-3xl whitespace-nowrap">Breakdown of Categories</h1>
    <div class="w-full h-[40vh]"><canvas id="pie"></canvas></div>    
</div>