import Form from './Form'
import Payment from './Payment';
import { useState } from 'react'
export default function Register(){
    const [userData,setUserData] = useState({});
    const [submit,setSubmit] = useState(false);
    
    return (
        <>
          {
            submit ? <Payment userData={userData} /> : 
            <Form userData={userData} setUserData={setUserData} setSubmit={setSubmit} />
          }
        </>
    )
}