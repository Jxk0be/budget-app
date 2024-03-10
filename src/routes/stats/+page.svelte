<script>
    import { onMount } from 'svelte';
    import { auth, db } from "$lib/firebase/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { doc, getDoc } from "firebase/firestore";
    import { goto } from "$app/navigation";
    import Chart from 'chart.js/auto';
    import { getContext } from 'svelte';

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
            }
            else goto("/auth")
        })
        let ctx = document.getElementById("pie")
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Red', "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(55, 199, 132, 0.2)',
                        'rgba(255, 9, 132, 0.2)',
                        'rgba(25, 199, 12, 0.2)',
                        'rgba(15, 29, 12, 0.2)',
                        'rgba(105, 129, 12, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(55, 199, 132, 1)',
                        'rgba(255, 9, 132, 1)',
                        'rgba(25, 199, 12, 1)',
                        'rgba(15, 29, 12, 1)',
                        'rgba(105, 129, 12, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        });

        return () => listen()
    })

    $: console.log(expenses, income)
    // Currency conversion API
    // Source of truth: https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file
    // Example: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
        // returns obj of currency objects and what $1 usd is worth in their currency
        // example: $1 usd is 147.84... in "jpy"
        // res = res.json()
        // res.usd <== that's the object with all currencies
        // res.usd.jpy <=== would be yen conversion
</script>

<div class="w-full h-screen pt-[90px] flex justify-center">
    <div class="w-full"><canvas id="pie"></canvas></div>    
</div>