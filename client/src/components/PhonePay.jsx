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
        await axios.post('http://localhost:3000/register/payment', {...data})
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
                <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <label>Name:</label>
        <input type="text" {...register("Name")} />
        <label>Email:</label>
        <input type="email" {...register("Email")} />
        <label>Phone Number:</label>
        <input type="Number" {...register("Phone Number")}/>
        <label>Gender</label>
        <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
        <select {...register("which college")}>
            <option value="VNR VJIET">VNR VJIET</option>
            <option value="Non VNR">Non VNR</option>
        </select>
        <label>Branch</label>
        <select {...register("Branch")}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
        </select>
        <label>Year</label>
        <select {...register("Year")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <label>Roll no.</label>
        <input type="text" {...register("Roll no.")}/>
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