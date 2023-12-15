import React, { useState, useEffect } from "react";
//import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Login/client";
import {useParams} from "react-router";
import "../vendors/fontawesome/assets/css/all.css";
import {useNavigate} from "react-router-dom";
function LikedSongs() {
    const [songs, setSongs] = useState([]);
    const { userID } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    //const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const findLikedSongs = async (id) => {
        try {
            const user = await client.findUserById(id);
            setSongs(user.liked_songs);
        } catch (err) {
            console.log(err);
        }
    };

    const removeSong = async (name) => {
        try {
            const user = await client.removeSong(userID, name);
            setSongs(user.liked_songs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { findLikedSongs(userID); fetchAccount();}, []);
    return (
        <div>
            <h1>Liked Songs - {songs ? songs.length : 0}</h1>
            <table className="table">
                <tbody>
                    {songs && songs.map((song) => {
                        return (
                            <tr>
                                <td>
                                    <h3>{song}</h3>
                                </td>
                                <td>
                                    {account._id === userID ?
                                        (<i onClick={() => removeSong(song)} className={"fa-solid fa-circle-minus"}/>):
                                    ""}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default LikedSongs;