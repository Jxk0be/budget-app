export const currencyConverter = async (fromCode = "usd", toCode = "jpy") => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode}.json`)
        const conversionRates = await response.json()
        return conversionRates[fromCode][toCode]
    }
    catch(error) {
        try {
            const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${fromCode}.json`)
            const conversionRates = await response.json()
            return conversionRates[fromCode][toCode]
        }
        catch(error) {
            console.log(error)
        }
    }
}