import React , {useState} from 'react'

export const Register = () => {
    const [email, setEmail]  = useState("");
    const [password, setPassword]= useState("");
    const [name, setName]= useState("");
    const [age, setAge]=useState("");

    const handleSubmit = (e) =>{
        e.preventDefaukt();
        console.log(email);
    }
  return (
    <>
      <h3>Register</h3>
<form onSubmit= {handleSubmit}>
<label for="name">Name</label>
<input value= {name} onChange={(e)=>setName(e.target.value)} type="name" placeholder='your name'></input>

<label for="age">age</label>
<input value= {age} onChange={(e)=>setAge(e.target.value)} type="age" placeholder='your age'></input>

<label for="email">Email</label>
<input value= {email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='your email'></input>

<label for="password">Password</label>
<input value= {password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='your password'></input>

<button type="submit">Register</button>
</form>
<button > Already have an account? Log in here</button>
    </>
  )
}