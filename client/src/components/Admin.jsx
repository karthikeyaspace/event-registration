import axios from "axios"
import { useForm } from "react-hook-form"
import { urlContext } from "../urlContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function Admin(){
    const navigate = useNavigate()
    const url = useContext(urlContext)
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        axios.post(`${url}admin`, data)
        .then((res)=>{
            console.log(res.data)
            if(res.data.message == "Login Success"){
                console.log("Login Success")
                sessionStorage.setItem("username", data.username)
                navigate('/admin/verify')
            }
            else{
                console.log("Login Failed")
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username")} required />
                <input type="password" {...register("password")} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}