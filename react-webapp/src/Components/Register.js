import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import axios from "../api/axios";

const NAME_REGEX = /^[a-ÖA-Ö]{1,50}$/
const EMAIL_REGEX = /^[a-öA-Ö0-9._-]+@[a-öA-Ö0-9.-]+\.[a-öA-Ö]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[a-ö])(?=.*[A-Ö])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const url = 'https://localhost:7139/api/Person';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [age, setAge] = useState(0);
    const [validAge, setValidAge] = useState(false);
    const [ageFocus, setAgeFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = age >= 18;
        console.log(result);
        console.log(age);
        setValidAge(result)
    }, [age])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevents hacking hacker to hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PASSWORD_REGEX.test(password);
        const v3 = NAME_REGEX.test(name);
        const v4 = age >= 18;
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(url,
                JSON.stringify({ name, password, email, age }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(response.data);
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Email is already registered")
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div className="login">
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login">Sign In</Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div className="login">
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Name:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !name ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="off"
                                required
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={validName ? "false" : "true"}
                                aria-aria-describedby="namenote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            <p id="namenote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Name can only contain letters and max 50
                            </p>

                            <label htmlFor="age">
                                Age:
                                <span className={validAge ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validAge || !age ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="number"
                                id="age"
                                autoComplete="off"
                                required
                                onChange={(e) => setAge(e.target.value)}
                                aria-invalid={validAge ? "false" : "true"}
                                aria-aria-describedby="agenote"
                                onFocus={() => setAgeFocus(true)}
                                onBlur={() => setAgeFocus(false)}
                            />
                            <p id="namenote" className={ageFocus && age && !validAge ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                You must be 18 or older to sign up
                            </p>

                            <label htmlFor="email">
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Need to be formated as an email. example "Name@mail.com"
                            </p>

                            <label htmlFor="password">
                                Password:
                                <span className={validPassword ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPassword || !password ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character <br />
                                Allowed special characters :
                                <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span>
                                <span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span>
                                <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <button disabled={!validAge || !validName || !validEmail || !validPassword || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/login">Sign In</Link>
                            </span>
                        </p>
                    </section>
                </div>
            )
            }
        </>
    )
}

export default Register