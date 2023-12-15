import React, { useState, useEffect } from "react";
//import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "../Login/client";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
function LikedAlbums() {
    const [albums, setAlbums] = useState([]);
    const { userID } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    //const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const findLikedAlbums = async (id) => {
        try {
            const user = await client.findUserById(id);
            setAlbums(user.liked_albums);
        } catch (err) {
            console.log(err);
        }
    };

    const removeAlbum = async (album) => {
        try {
            const user = await client.removeAlbum(userID, album);
            setAlbums(user.liked_albums);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { findLikedAlbums(userID); fetchAccount(); }, []);
    return (
        <div>
            <h1>Liked Albums - {albums ? albums.length : 0}</h1>
            <table className="table">
                <tbody>
                {albums && albums.map((album) => {
                    return (
                        <tr>
                            <td>
                                {album}
                            </td>
                            <td>
                                {account._id === userID ?
                                    (<i onClick={() => removeAlbum(album)} className={"fa-solid fa-circle-minus"}/>):
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
export default LikedAlbums;