import logo from './logo.svg';
import './App.css';
import Home from './Home';

import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import ProjectNav from "./Navigation/projectNav";
import Login from "./Login";
import Profile from "./Login/profile";
import {Card, Container, Row} from "react-bootstrap";
import SearchPage from "./Search";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Signup";
import Details from "./Details";
import LikedSongs from "./Liked/songs";
import LikedAlbums from "./Liked/albums";
import Followers from "./Login/followers";
import Following from "./Login/following";
import UserTable from "./Login/users";

function App() {
  return (
      <HashRouter>
        <div>
            <Container>
                <ProjectNav/>
                <Routes>
                    <Route path={"/"} element={<Navigate to="/Home"/>}/>
                    <Route path={"/Home"} element={<Home/>}/>
                    <Route path={"/Login"} element={<Login/>}/>
                    <Route path={"/Profile"} element={<Profile/>}/>
                    <Route path={"/Search"} element={<SearchPage/>}/>
                    <Route path={"/Signup"} element={<Signup/>}/>
                    <Route path={"/Users"} element={<UserTable/>}/>
                    <Route path={"/Details/:albumID"} element={<Details/>}/>
                    <Route path={"/Liked/Songs/:userID"} element={<LikedSongs/>}/>
                    <Route path={"/Liked/Albums/:userID"} element={<LikedAlbums/>}/>
                    <Route path={"/Followers/:userID"} element={<Followers/>}/>
                    <Route path={"/Following/:userID"} element={<Following/>}/>
                </Routes>
            </Container>
        </div>
      </HashRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
