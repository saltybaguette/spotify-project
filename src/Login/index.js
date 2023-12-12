
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {FormControl, InputGroup} from "react-bootstrap";

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    let err = false;
    const signin = async () => {
        let creds = await client.signin(credentials);
        if(creds === null) {
            //there's a login error
        }
        else {
            navigate("/Profile");
        }
        console.log(err);
    };
    let showErr = (error) => {
        if(!error) {
            return {display:"none"};
        }
        return "";
    }
    return (
        <div onKeyDown={(key) => {if(key.key === "Enter"){signin()}}}>
            <h1>Signin</h1>
            <InputGroup>
                <label about={"username_input"}>Username</label>
                <input placeholder={"Username"} id={"username_input"} value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                <label about={"password_input"}>Password</label>
                <input placeholder={"Password"} id={"password_input"} value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                <button onClick={signin}> Signin </button>
                <div>
                    <h3 style={showErr(err)}>Error Logging In</h3>
                </div>

            </InputGroup>
        </div>
    );
}
export default Login;