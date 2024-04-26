import React, { useState, useEffect } from "react"
import axios from "axios"

export default function PhonePay(props) {
    const [loading, setLoading] = useState(false)
    const amountToBePaid = props.userData.whichCollege === 'VNRVJIET' ? 149 : 199
    const data = {
        name: props.userData.name,
        amount: amountToBePaid,
        number: props.userData.phoneNumber,
        MUID: "MUID123",
        transactionId: "MT7850590068188104"
    }

    // const data = {
    //      name: props.userData.name,
    //      amount: amountToBePaid,
    //      number: props.userData.phoneNumber,
    //     MUID: "MUID" + Date.now(),
    //     transactionId: "TPY" + Date.now()
    // }
    let userData = props.userData
    userData = {...userData, MUID: data.MUID, transactionId: data.transactionId, status: "pending"}
    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('https://bug-free-acorn-445994w76pxhq99-3000.app.github.dev/register', {...userData})
        .then(res => { 
            console.log(res.data)
            if(res.data.message === "Instance Created"){
                handlePayment();
            }
            else {    
                return <h1>Unable to process request</h1>
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const handlePayment = async () => {
        setLoading(true)
        await axios.post('https://bug-free-acorn-445994w76pxhq99-3000.app.github.dev/register/payment', { ...data })
            .then(res => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        console.log(data)
    }



    return (
        <div className="container">
            <div className="phonepe">
                <form onSubmit={handleRegister}>
                    {
                        data && (
                            <>
                                <h2>Name: {data.name}</h2>
                                <h2>Phone Number: {data.number}</h2>
                                <h2>Amount: {data.amount}</h2>
                            </>
                        )
                    }

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