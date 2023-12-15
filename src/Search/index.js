
import {Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import "../vendors/fontawesome/assets/css/all.css";
import * as client from "../Login/client";

const client_id = "9dd2432b43834324959223666effbf85";
const client_secret = client.SPOTIFY_SECRET;


function SearchPage() {
    const navigate = useNavigate();
    const [searchInput, setSearch] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [account, setAccount] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
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
            .then(data => setAccessToken(data.access_token));
        fetchAccount()
    },[])


    function details(id) {
        navigate("/Details/"+id);
    }

    const addLikedAlbum = async (albumName) => {
        await client.addLikedAlbum(account._id, albumName);
    }

    async function search() {
        var params = {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+accessToken,
            }
        }
        var artist_id = await fetch("https://api.spotify.com/v1/search?q="+searchInput+"&type=artist", params)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id})
        var albums = await fetch("https://api.spotify.com/v1/artists/"+artist_id+"/albums?include_groups=album&market=US&limit=50", params)
            .then(response => response.json())
            .then(data => {
                setAlbums(data.items);
            })
    }

    return(
        <div className={"App"}>

            <Container>
                <InputGroup className={"mb-3"} size={"lg"}>
                    <FormControl
                        placeholder={"Artist"}
                        type={"input"}
                        onKeyDown={(key) => {
                            if(key.key === "Enter") {
                                search();
                            }}
                        }
                        onChange={input => setSearch(input.target.value)}
                        />
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className={"mx-2 row row-cols-4"}>
                    {albums.map((album, i) => {
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} onClick={() => details(album.id)}/>
                                <Card.Title>{album.name}</Card.Title>
                                <Card.Body>
                                    <i onClick={() => addLikedAlbum(album.name)} className="fa-solid fa-2x fa-circle-plus "></i>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>

            </Container>
        </div>
    );
}
export default SearchPage;