import { useContext, useState } from "react";
import { AppSettingsContext, ControllersContext } from "../App";
import { useNavigate } from "react-router-dom";
import LocalStorageNoteController from "../controllers/LocalStorageNoteController";
import { APINoteController } from "../controllers/APINoteController";
import ContextModel from "../models/ContextModel";

function Login(props) {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let appSettingsContext = useContext(AppSettingsContext);
    let controllerContext = useContext(ControllersContext);
    const navigate = useNavigate();

    function updateUsername(event) {
        setUserName(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    async function tryLogin(event) {
        event.preventDefault();
        let reqBody = {
            username: username,
            password: password
        }
        try {
            let result = await fetch("/api/User/loginbyuserpass",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reqBody),
                });
            if (result.status === 200) {
                appSettingsContext._setIsUserLoggedIn(true);
                navigate("/");
                controllerContext.setControllerContext(new ContextModel(new APINoteController()));
            }
            else {
                alert("Wrong username or password!");
            }
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }

    }

    function setLocalStorage(event) {
        event.preventDefault();
        appSettingsContext._setIsLocalStorage(true);
        controllerContext.setControllerContext(new ContextModel(new LocalStorageNoteController()));
        navigate("/");
    }

    return (
        <div id="loginCard">
            <h1>
                Simple Notes
            </h1>
            <img src="/favicon.svg" alt="logo" />
            <h2>
                Jotting made simple
            </h2>
            <input onChange={updateUsername} type="text" placeholder="Username"></input>
            <input onChange={updatePassword} type="password" placeholder="Password"></input>
            <button onClick={tryLogin}>Login</button>
            <p>No account? Create one!</p>
            <p onClick={setLocalStorage}>Save your data with no account!</p>
        </div>
    );
}

export default Login;