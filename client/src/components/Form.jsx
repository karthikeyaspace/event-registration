import { useForm } from "react-hook-form"

export default function Form(props) {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        props.setUserData(data)
        props.setSubmit(true)
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <label>Name:</label>
                <input type="text" {...register("name")} required/>
                <label>Email:</label>
                <input type="email" {...register("email")} required />
                <label>Phone Number:</label>
                <input type="Number" {...register("phoneNumber")} required/>
                <label>Gender</label>
                <select {...register("gender")} required >
                    <option value="Choose" disabled>Choose</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                </select>
                <select {...register("whichCollege")} required>
                    <option value="VNRVJIET">VNR VJIET</option>
                    <option value="NonVNR">Non VNR</option>
                </select>
                <label>Branch</label>
                <select {...register("branch")} required>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="IT">IT</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                </select>
                <label>Year</label>
                <select {...register("year")} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <label>Roll no.</label>
                <input type="text" {...register("roll no.")} required/>

                <button type='submit'> Register </button>

            </form>
        </>
    )
}