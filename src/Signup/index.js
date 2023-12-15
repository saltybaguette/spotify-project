import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Login/client.js";
import {Button, FormControl, InputGroup} from "react-bootstrap";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", role: "USER" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.createUser(credentials);
            navigate("/Profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <InputGroup className={"mb-3"}>
                <input
                    placeholder={"Username"}
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value })} />
                <input
                    placeholder={"Password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value })} />
                <select onChange={(e)=> {
                    setCredentials({
                        ...credentials,
                        role: e.target.value
                    });
                    console.log(e.target.value);
                }} defaultValue={"USER"}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <Button onClick={signup}>
                    Signup
                </Button>
            </InputGroup>
        </div>
    );
}
export default Signup;