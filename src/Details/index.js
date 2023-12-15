
import {Routes, useParams} from "react-router";
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import "../vendors/fontawesome/assets/css/all.css";
import * as client from "../Login/client";
import {useNavigate} from "react-router-dom";

const client_id = "9dd2432b43834324959223666effbf85";
const client_secret = client.SPOTIFY_SECRET;



function Details() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    const { albumID } = useParams();
    const [accessToken, setAccessToken] = useState("");
    const [album, setAlbum] = useState("");

    useEffect(() => {
        var params = {
            method:"POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id="+client_id+"&client_secret="+client_secret
        }
        fetch('https://accounts.spotify.com/api/token', params)
            .then(result => result.json())
            .then(data => {getAlbum(data.access_token)});
        fetchAccount();
        // .then(data => setAccessToken(data.access_token))


    },[])

    async function getAlbum(token) {
        var searchParams = {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
            }
        }

        await fetch("https://api.spotify.com/v1/albums/"+albumID, searchParams)
            .then(response => response.json())
            .then(data => {setAlbum(data);});

    }

    const addLikedSong = async (songName) => {
        if(account) {
            await client.addLikedSong(account._id, songName);
        }
        else {
            navigate("/Signup");
        }
    }

    const addLikedAlbum = async (albumName) => {
        if(account) {
            await client.addLikedAlbum(account._id, albumName);
        }
        else {
            navigate("/Signup");
        }

    }



    return(
        <div className={"App"}>
            <Row className={"row-cols-1"}>
                <h3>{album.name}</h3>
                <div className={"col-sm"} onClick={() => addLikedAlbum(album.name)}>
                    <i  className="fa-solid fa-2x fa-circle-plus "></i>
                </div>
            </Row>
            <Row className={"row-cols-sm-3 small"}>
                <div className={"cols-sm-3"}>
                    {album && <img src={album.images[0].url}/>}
                </div>
            </Row>

            <Container>
                <ul>
                    {album && album.tracks.items.map((track, i) => {
                        return (
                            <Row className={"row row-cols-2"}>
                                <div className={"col-sm"}>
                                    {track.name}
                                </div>
                                <div className={"col-sm"} onClick={() => addLikedSong(track.name)}>
                                    <i  className="fa-solid fa-2x fa-circle-plus "></i>
                                </div>

                            </Row>
                        )
                    })}
                </ul>
            </Container>
        </div>
    );
}
export default Details;