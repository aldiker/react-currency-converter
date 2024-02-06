// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react'

export default function App() {
    const [amount, setAmount] = useState(100)
    const [currencyFrom, setCurrencyFrom] = useState('USD')
    const [currencyTo, setCurrencyTo] = useState('EUR')

    const [result, setResult] = useState('')
    console.log(`result = ${result}`)

    useEffect(
        function () {
            async function getCurrencyCourse() {
                try {
                    const res = await fetch(
                        `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
                    )
                    const data = await res.json()
                    console.log(data)

                    if (!data.message) setResult(data.rates[currencyTo])
                    else setResult(amount)
                } catch (error) {
                    console.log(error)
                }
            }
            getCurrencyCourse()
        },
        [amount, currencyFrom, currencyTo]
    )

    return (
        <div className='container'>
            <div className='inputData'>
                <input
                    type='number'
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }}
                />
                <select
                    className='curFrom'
                    value={currencyFrom}
                    onChange={(e) => {
                        setCurrencyFrom(e.target.value)
                    }}>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='CAD'>CAD</option>
                    <option value='INR'>INR</option>
                </select>
                <span className='to'>to</span>
                <select
                    className='curTo'
                    value={currencyTo}
                    onChange={(e) => {
                        setCurrencyTo(e.target.value)
                    }}>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='CAD'>CAD</option>
                    <option value='INR'>INR</option>
                </select>
            </div>

            <p>
                {result} {currencyTo}
            </p>
        </div>
    )
}
