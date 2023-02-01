import { useState } from 'react'
import {Box, Text, ChakraProvider} from "@chakra-ui/react";
import {Route, Router, Routes} from "react-router-dom";
import Homepage from "./components/Homepage.js";
import Signin from "./components/Signin.js";
import Projects from "./components/Projects.js";
import Profile from "./components/Profile.js";
import Consultation from "./components/Consultation.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import {auth} from "./firebase.js";
import ProjectDetails from "./components/ProjectDetails.js";
import EquipmentDetails from "./components/EquipmentDetails";


function App() {

    const user = auth.currentUser;
    //console.log(user.uid)

  return (
      <ChakraProvider>
          <Navbar/>
        <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/equipment/:id" element={<EquipmentDetails />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path="/consultation" element={<Consultation />} />
        </Routes>
          <Footer/>
      </ChakraProvider>
  )
}

export default App
