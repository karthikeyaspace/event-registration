import { useForm } from "react-hook-form"
import { useContext } from "react"
import { urlContext } from "../urlContext"


export default function Form(props) {
    const url = useContext(urlContext)
    const { register, handleSubmit } = useForm()
    const handleFormSubmit = (data) => {
        props.setUserData(data)
        console.log(data)
        props.setSubmit(true)
    }

    return (
        <div className="container">
            <div className="form flex flex-col justify-center items-center my-8">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col justify-center items-left border-2 border-black p-4 sm:p-12 rounded-lg mx-4">
                    <h1 className="text-4xl m-auto">Register</h1>
                    <div className="input-cont">
                        <label>Name:</label>
                        <input type="text" {...register("name")} required />
                    </div>
                    <div className="input-cont">
                        <label>Email:</label>
                        <input type="email" {...register("email")} required />
                    </div>
                    <div className="input-cont">
                        <label>Phone Number:</label>
                        <input type="Number" {...register("phoneNumber")} required />
                    </div>
                    <div className="input-cont"><label>Gender</label>
                        <select {...register("gender")} required >
                            <option value="Choose" disabled>Choose</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="input-cont"><label>College</label>
                        <select {...register("whichCollege")} required>
                            <option value="VNRVJIET">VNR VJIET</option>
                            <option value="NONVNR">Non VNR</option>
                        </select>
                    </div>
                    <div className="input-cont"><label>Branch</label>
                        <select {...register("branch")} required>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="IT">IT</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div>
                    <div className="input-cont">
                        <label>Year</label>
                        <select {...register("year")} required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="input-cont">
                        <label>Roll no.</label>
                        <input type="text" {...register("roll")} required />
                    </div>
                    <button type='submit' className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">Register</button>
                </form>
            </div>
        </div>
    )
}