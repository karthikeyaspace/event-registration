import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function PhonePay(props) {
    const navigate = useNavigate()
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
        await axios.post('http://localhost:3000/register', {...userData})
        .then(res => { 
            console.log("handle register", res.data)
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
        await axios.post('http://localhost:3000/register/payment', { ...data })
            .then(res => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
                console.log(res.data)
                // navigate(res.data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        console.log("handle Payment", data)
    }



    return (
        <div className="container">
            <div className="phonepe flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleRegister} className="flex flex-col justify-center items-left border-2 border-black p-12 rounded-lg mx-4">
                    {
                        data && (
                            <>
                                <h2 className="text-2xl mb-4 "><strong>Name:</strong> {data.name}</h2>
                                <h2 className="text-2xl mb-4 "><strong>Phone Number:</strong> {data.number}</h2>
                                <h2 className="text-2xl mb-4 "><strong>Amount:</strong> {data.amount}</h2>
                            </>
                        )
                    }

                    {
                        !loading ? (
                            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">Pay now</button>
                        ) : (
                            <button type="submit" disabled className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">Loading...</button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}