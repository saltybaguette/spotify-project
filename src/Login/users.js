import React, { useState, useEffect } from "react";
import * as client from "./client";
import "../vendors/fontawesome/assets/css/all.css";
import {useNavigate} from "react-router-dom";
function UserTable() {
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    //const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const addFollowing = async (name) => {
        await client.addFollowing(account._id, name);

        let user = await client.findUserByUsername(name);
        await client.addFollower(user._id, account.username);
    }



    useEffect(() => { fetchUsers();
        fetchAccount();}, []);
    return (
        <div>
            <h1>Users</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            {(account?
                                (account.username === user.username?
                                    "":
                                    (<i onClick={() => (account?addFollowing(user.username):navigate("/Login"))} className={"fa-solid fa-2x fa-circle-plus"}/>)):
                                (<i onClick={() => navigate("/Login")} className={"fa-solid fa-2x fa-circle-plus"}/>))}

                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default UserTable;