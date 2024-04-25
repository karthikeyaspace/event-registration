import React, {useState, useEffect} from "react"
import axios from "axios"

export default function PhonePay(){

    const [loading, setLoading] = useState(false)
    const data = {
        name: "karthikeya",
        amount: 1,
        number: "8919712544",
        MUID: "MUID123",
        transactionId: "MT7850590068188104"
    }
    
    // const data = {
    //     name: "karthikeya",
    //     amount: 1,
    //     number: "8919712544",
    //     MUID: "MUID" + Date.now(),
    //     transactionId: "TPY" + Date.now()
    // }

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post('https://bug-free-acorn-445994w76pxhq99-3000.app.github.dev/register/payment', {...data})
        .then(res => {
            setTimeout(()=>{
                setLoading(false)
            }, 1500)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <div className="container">
            <div className="phonepe">
                <form onSubmit={handlePayment}>
                    <p>Name: {data.name}</p>
                    <p>Number: {data.number}</p>
                    <p>Amount: {data.amount}</p>

                    {
                        !loading ? (
                            <button type="submit">Pay now</button>
                        ) : (
                            <button type="submit" disabled>Loading...</button>
                        )
                    }

                </form>
            </div>
        </div>
    )
}