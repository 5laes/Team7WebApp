import Constants from "./Constants";
import { useState } from "react";


export function GetPersonByEmail(email, password) {
    const [inloggedUser, setInloggedUser] = useState({});
    // const [emailLogin, setEmailLogin] = useState("");

    const url = `${Constants.API_URL_GET_PERSON_EMAIL}?email=${encodeURI(email)}`;
    fetch(url, {
        method: "GET",
    })
        .then(response => response.json())
        .then(resultsFromServer => {
            if (resultsFromServer.success === false) {
                resultsFromServer.errorMessages.map((error) => { console.log(error); alert(error) });
            }
            console.log(resultsFromServer);

            if (password === resultsFromServer.password) {
                console.log('succes')
                setInloggedUser(resultsFromServer);
            }
            else {
                alert("wrong password");
                console.log('fail')

            }
        })
        .catch((error => { console.log(error); alert(error); }))
}