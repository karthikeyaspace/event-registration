import { useForm } from "react-hook-form"

export default function Register() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    
  )
}