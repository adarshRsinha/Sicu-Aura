import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Camera from "./components/Camera";
import About from "./components/About";
// import Image from "./components/Image";
import "./styles/App.css";
import "./styles/Header.css";
import "./styles/Register.css";
import "./styles/Login.css";
import "./styles/Camera.css";

function App(){
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Register/>} />
                <Route path="/signin" element={<Login/>} />
                <Route path="/capture" element={<Camera/>} />
                <Route path="/hospital-registration" element={<About/>} />
                {/* <Route path="/capture/:id" element={<Image/>} /> */}
            </Routes>
        </Router>
    );
}

export default App;