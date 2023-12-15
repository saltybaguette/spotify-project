import React, { useState, useEffect } from "react";
//import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Login/client";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

function Following() {
    const [fs, setFollowing] = useState([]);
    const { userID } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    //const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const findFollowing = async (user) => {
        try {
            const u = await client.findUserById(user);
            setFollowing(u.following);
        } catch (err) {
            console.log(err);
        }
    };

    const goToSongs = async (name) => {
        try {
            const u = await client.findUserByUsername(name);
            navigate("/Liked/Songs/"+u._id);
        } catch (err) {
            console.log(err);
        }
    }
    const unfollow = async (name) => {
            let u = await client.unfollow(account._id, name);
            setFollowing(u.following);
            let user = await client.findUserByUsername(name);
            await client.removeFollower(user._id, account.username);


    }

    useEffect(() => { findFollowing(userID); fetchAccount()}, []);
    return (
        <div>
            <h1>Following - {fs ? fs.length : 0}</h1>
            <table className="table">
                <tbody>
                {fs && fs.map((follower) => {
                    return (
                        <tr>
                            <td>
                                {follower}
                            </td>
                            <td>
                                <Button onClick={() => goToSongs(follower)}>
                                    Liked Songs
                                </Button>
                            </td>
                            <td>
                                <Button className={"alert-danger"} onClick={() => unfollow(follower)}>
                                    Unfollow
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}
export default Following;