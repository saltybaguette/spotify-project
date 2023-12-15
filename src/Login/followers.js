import React, { useState, useEffect } from "react";
//import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Login/client";
import {useParams} from "react-router";
function Followers() {
    const [fs, setFollowers] = useState([]);
    const { userID } = useParams();

    //const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const findFollowers = async (user) => {
        try {
            const u = await client.findUserById(user);
            setFollowers(u.followers);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { findFollowers(userID); }, []);
    return (
        <div>
            <h1>Followers - {fs ? fs.length : 0}</h1>
            <table className="table">
                <tbody>
                {fs && fs.map((follower) => {
                    return (
                        <tr>
                            <td>
                                {follower}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}
export default Followers;