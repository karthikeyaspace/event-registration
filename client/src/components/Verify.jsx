import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { urlContext } from '../urlContext';
// import { use } from "../../../server/api/routes/register";


export default function Verify(){
    const [users, setUsers] = useState("")
    const url = useContext(urlContext)
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate();
    
    if(!username){
        navigate('/admin')
    }

useEffect(()=>{
    axios.get(`${url}admin/verify`)
    .then((res)=>{
        setUsers(res.data.payload)
    })
    .catch((err)=>{
        console.log(err)
    })
}, [])
    const verify = (user) => {
            user.status = "Approved"
            console.log(user)
            axios.put(`${url}admin/verify`, {user: user})
            .then((res)=>{
                setUsers(res.data.users)
            })
            .catch((err)=>{
                console.log(err)
            })
        } 
    const decline = (user) => {
            user.status = "Decline"
            console.log(user)
            axios.put(`${url}admin/verify`, {user: user})
            .then((res)=>{
                setUsers(res.data.users)
            })
            .catch((err)=>{
                console.log(err)
            })
        } 
    return (
        <>
        {
            users && users.map((user, index)=>{
                return (
                    <div key={index}>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.phoneNumber}</p>
                        <p>{user.whichCollege}</p>
                        <p>{user.transactionId}</p>
                        <p>status {user.status}</p>
                        <button onClick={()=>{verify(user)}}>Verify</button>
                        <button onClick={()=>decline(user)}>Decline</button>
                    </div>
                )
            })
        }
    </>
    )

}