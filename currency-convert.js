// api from fixer.io
// and from restcountries.eu
// base curr for all curr's is Eur

const axios = require('axios');


const getExchangeRate = async (from, to) => {
    let url = 'http://data.fixer.io/api/latest?access_key=ec7baa05c75699aa9483258e7e44ce74&format=1'
    try {
        const response = await axios.get(url);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error()
        }

        return rate;
    } catch (error) {
        throw new Error(`Unable to get exchange rate from ${from} and ${to}`);
    }

};


const getCountries = async (currencyCode) => {
    let url = `https://restcountries.eu/rest/v2/currency/${currencyCode}`

    try {
        const response = await axios.get(url);

        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries the use ${currencyCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    try {
        const rate = await getExchangeRate(from, to);
        const countries = await getCountries(to);
        const total = (amount * rate).toFixed(2);

        if (isNaN(total)) 
            throw new Error();

        return `${amount} ${from} is worth ${total} ${to}. You can spend it the following countries ${countries.join(', ')}`

    } catch (error) {
        throw new Error(`Unable to convert exchange rate from ${from} and ${to} with ${amount}`);
    }

}


convertCurrency('USD', 'ILS')
    .then((res) => {
        console.log(res);
    })
    .catch(e => {
        console.log(e.message);
    })

