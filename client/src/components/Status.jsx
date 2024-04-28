import {useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form';


export default function Status(){
    const { register, handleSubmit } = useForm();

    const handleStatus = (data) => {
        
    }

    return (
        <div className="success h-screen">
            <form onSubmit={handleSubmit(handleStatus)}>

                <div className='status-input'>
                    <div className="input-div">
                        <label>Enter transaction ID</label>
                        <input type="text" {...register("transactionId")}/>
                    </div>
                    <p>OR</p>
                    <div className="input-div">
                        <label>Enter Roll used during registration</label>
                        <input type="text" {...register("rollnumber")}/>
                    </div>
                </div>
                <button type='submit'>Get status</button>
            </form>

        </div>
    )
}