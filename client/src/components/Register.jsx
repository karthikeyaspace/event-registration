import Form from './Form'
import PhonePay from './PhonePay';
import { useState } from 'react'
export default function Register(){
    const [userData,setUserData] = useState({});
    const [submit,setSubmit] = useState(false);
    
    return (
        <>
          {
            submit ? <PhonePay userData={userData} /> : 
            <Form userData={userData} setUserData={setUserData} setSubmit={setSubmit} />
          }
        </>
    )
}