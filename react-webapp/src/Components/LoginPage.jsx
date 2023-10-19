import React , {useState} from 'react'
import Constants from '../Utilities/Constants';
import PersonPage from './PersonPage';
//import PersonFunctions, { GetPersonByEmail } from '../Utilities/PersonFunctions'


export const LoginPage = () => {
    const [email, setEmail]  = useState("");
    const [password, setPassword]= useState("");
    const [inloggedUser, setInloggedUser] = useState({});

    const handleSubmit = (e) =>{
        e.preventDefault();
        GetPersonByEmail(email, password);
        console.log(email);
    }

    const GetPersonByEmail=(email, password)=> {
        const url = `${Constants.API_URL_GET_PERSON_EMAIL}?email=${encodeURI(email)}`;
        console.log(url)
        fetch(url, {
            method: "GET",
        })
            .then(response => response.json())
            .then(resultsFromServer => {
                if (resultsFromServer.success === false) {
                    resultsFromServer.errorMessages.map((error) =>  console.log(error));
                }
                console.log(resultsFromServer);
                console.log(`password is ${password} and result.pass is ${resultsFromServer.result.password}`);
    
                if (resultsFromServer.success === true && password === resultsFromServer.result.password) {
                    console.log('success in logging in')
                    setInloggedUser(resultsFromServer);
                }
                else if (resultsFromServer.success === true && password != resultsFromServer.result.password){
                    console.log("wrong password");
                }
                else {
                    console.log(resultsFromServer.errorMessages[0])
                }
            })
            .catch((error =>  console.log(error)))
    }

return (
    <>
    <h3>Log in </h3>
<form onSubmit= {handleSubmit}>
<label for="email">Email</label>
<input value= {email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='your email'></input>

<label for="password">Password</label>
<input value= {password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='your password'></input>

<button type="submit">log In </button>
</form>

{inloggedUser.success && <PersonPage user={inloggedUser.result} />}
<button > dont have an account? Register here</button>
    </>
)
}

