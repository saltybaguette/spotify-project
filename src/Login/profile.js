import * as client from "./client";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import LikedSongs from "../Liked/songs";
import {Route, Routes} from "react-router";
import LikedAlbums from "../Liked/albums";
import {Button} from "react-bootstrap";
function Profile() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    useEffect(() => {
        fetchAccount();
    }, []);
    const save = async () => {
        await client.updateUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/project/signin");
    };


    return (
        <div className="w-50">
            <h1>Account</h1>
            {(account && (
                <div>
                    <input value={account.username}
                           placeholder={"Username"}
                           onChange={(e) => setAccount({...account,
                           username: e.target.value})}/>
                    <input value={account.password}
                           placeholder={"Password"}
                           onChange={(e) => setAccount({ ...account,
                               password: e.target.value })}/>
                    <input value={account.firstName}
                           placeholder={"First Name"}
                           onChange={(e) => setAccount({ ...account,
                               firstName: e.target.value })}/>
                    <input value={account.lastName}
                           placeholder={"Last Name"}
                           onChange={(e) => setAccount({ ...account,
                               lastName: e.target.value })}/>
                    <input value={account.dob}
                           placeholder={"Date of Birth"}
                           onChange={(e) => setAccount({ ...account,
                               dob: e.target.value })}/>
                    <input value={account.email}
                           placeholder={"Email"}
                           onChange={(e) => setAccount({ ...account,
                               email: e.target.value })}/>
                    <br/>
                    <label about={"role"}>Role </label>
                    <select id={"role"} onChange={(e) => setAccount({ ...account,
                        role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <br/>
                    <Button onClick={save}>
                        Save
                    </Button>
                    <Button onClick={signout}>
                        Signout
                    </Button>

                    <button onClick={() => navigate("/Liked/Songs/"+account._id)} className="btn btn-warning w-100">
                        Liked Songs
                    </button>
                    <button onClick={() => navigate("/Liked/Albums/"+account._id)} className="btn btn-warning w-100">
                        Liked Albums
                    </button>
                    <button onClick={() => navigate("/Followers/"+account._id)} className="btn btn-warning w-100">
                        Followers
                    </button>
                    <button onClick={() => navigate("/Following/"+account._id)} className="btn btn-warning w-100">
                        Following
                    </button>
                    {/*<Link to={"/Profile/Liked/Songs"+account._id} className="btn btn-warning w-100">*/}
                    {/*    Following*/}
                    {/*</Link>*/}
                </div>
            )) || navigate("/Login")}
            {/*<Routes>*/}
            {/*    <Route path={"/project/admin/users/songs/"} element={<LikedSongs />}/>*/}
            {/*</Routes>*/}
            {/*<Routes>*/}
            {/*    <Route path={"/project/admin/users/albums/"} element={<LikedAlbums />}/>*/}
            {/*</Routes>*/}
            {/*<Routes>*/}
            {/*    <Route path={"/project/admin/users/albums/"} element={<LikedAlbums />}/>*/}
            {/*</Routes>*/}
        </div>
    );
}
export default Profile;