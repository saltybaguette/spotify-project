
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import "../vendors/fontawesome/assets/css/all.css";
import * as client from "../Login/client";

const client_id = "9dd2432b43834324959223666effbf85";
const client_secret = client.SPOTIFY_SECRET;

let called = false;

function Home() {
    //const [searchInput, setSearch] = useState("");
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    let page = 0;
    let deps = [nextPage(),prevPage()];
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
            .then(data => {setAccessToken(data.access_token);
                            getTopSongs(data.access_token)});
        fetchAccount();

    },[])

    function nextPage() {
        page+=20;
    }
    function prevPage() {
        if(page>=20) {
            page-=20;
        }
    }

    function details(id) {
        navigate("/Details/"+id);
    }

    const addLikedAlbum = async (albumName) => {
        if(account) {
            await client.addLikedAlbum(account._id, albumName);
        }
        else {
            navigate("/Signup");
        }
    }


    async function getTopSongs(token) {
            var params = {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token,
                }
            }
            // var artist_id = await fetch("https://api.spotify.com/v1/me/shows?q="+searchInput+"&type=artist", params)
            //     .then(response => response.json())
            //     .then(data => {return data.artists.items[0].id})
            var albums = await fetch("https://api.spotify.com/v1/browse/new-releases?offset="+page, params)
                .then(response => response.json())
                .then(data => {
                    setAlbums(data.albums.items);
                })

    }
    return(
        <div className={"App"}>
            <Container>
                <Row className={"mx-2 row row-cols-1"}>
                    <h3>Home</h3>
                </Row>
                {(account?(<Row className={"mx-2 row row-cols-4"}>
                    <Col>
                        <Button onClick={() => navigate("/Liked/Songs/"+account._id)}>Liked Songs</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate("/Liked/Albums/"+account._id)}>Liked Albums</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate("/Followers/"+account._id)}>Followers</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate("/Following/"+account._id)}>Following</Button>
                    </Col>
                </Row> ):"")}
                <br/>
                <Row className={"mx-2 row row-cols-1"}>
                    <h3>Top 20 Releases!</h3>
                </Row>
            </Container>
            <br/>
            <Container>
                <Row className={"mx-2 row row-cols-4"}>
                    { albums && albums.map((album, i) => {
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} onClick={() => details(album.id)}/>
                                <Card.Title>{album.name}</Card.Title>
                                <Card.Body>
                                    <h2>#{i+1}</h2>
                                    <i onClick={() => addLikedAlbum(album.name)} className="fa-solid fa-2x fa-circle-plus"></i>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>
            {/*<Button onClick={prevPage}>Previous Page</Button>*/}
            {/*<Button onClick={nextPage}>Next Page</Button>*/}
        </div>
    );
}
export default Home;