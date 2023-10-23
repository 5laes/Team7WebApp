import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Default = () => {

    const { auth, setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
    }

    return (
        <section>
            <h1>Hello {auth.name}, Welcome to Team7 Web App</h1>
            <br/>
            <Link to="/admin">Admin Portal</Link>
            <br/>
            <Link to="/person">Person Portal</Link>
            <div>
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Default