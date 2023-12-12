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
