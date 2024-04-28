import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClipboardJS from 'clipboard';
new ClipboardJS('.btn');
import { useContext } from 'react';
import { urlContext } from '../urlContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Payment(props) {
    const [status, setStatus] = useState(false);
    const url = useContext(urlContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    let userData = props.userData
    const amount = userData.whichCollege === 'VNRVJIET' ? 149 : 199
    
    const handleRegister = async (data) => {
        userData = {...userData, amount: amount, transactionId: data.transactionId, status: "not verified"}
        await axios.post(`${url}register`, {...userData})
        .then(res=>{
            if(res.data.message === "Instance Created"){
                console.log("Payment Successful")
                navigate(`/status`)
            }
            else if(res.data.message === "TxnId already exists"){
                console.log('Payment already done')
                setStatus(true)

            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="container">
            <div className="phonepe flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col justify-center items-left border-2 border-black p-12 rounded-lg mx-4">
                    {
                        userData && (
                            <>  <h1>Your Details</h1>
                                <h2 className="text-2xl mb-4 "><strong>Name:</strong> {userData.name}</h2>
                                <h2 className="text-2xl mb-4 "><strong>Phone Number:</strong> {userData.number}</h2>
                                <h2 className="text-2xl mb-4 "><strong>Amount:</strong> {amount} </h2>
                            </>
                        )
                    }
                    
                    <div className="payment-div">
                        <h1 className="text-2xl mb-4">Scan the QR code to pay</h1>
                        <img src="qrcodetopay.png" alt="PhonePe" className="w-1/2 h-1/2" />
                        <p id="foo" defaultValue={890809809809}>Mobile number: 890809809809</p>
                        <button className="btn" data-clipboard-target="#foo">
                            Copy
                        </button>
                        <p>Name: Maneesh</p>
                    </div>

                    <div className="input-div">
                        {status && (<h1>Transaction Id already used</h1>)}
                        <input type="number" required {...register("transactionId")}/>
                    </div>
                    
                    <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">Pay now</button>
                </form>
            </div>
        </div>
    )
}