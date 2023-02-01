import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

import {auth} from "../firebase";

function Navbar() {
    //let history = useNavigate();
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const goToHome = () => {
        navigate("/")
    }
    const goToProjects = () => {
        navigate("/projects")
    }
    const goToAdminDashboard = () => {
        navigate("/admin")
    }
    const goToConsultations = () => {
        navigate("/consultation")
    }
    const handleSignIn = () => {
        if (user){
            auth.signOut().then(() => {
                navigate("/signin")
                console.log("user signed out")
            }).catch((error) => {
                console.log(error.message)
            });

        }
        else {
            navigate("/signin")
            console.log("User not found")
        }
    }
    return (
        <Flex bg="gray.800" p={4} align="center">
            <Box fontSize="3xl" color="blue.400" fontWeight="bold">
                <Link onClick={goToHome} paddingLeft="2">IBMS</Link>

            </Box>
            <Box ml="auto">

                <Link color="white" mr={4} onClick={() => goToProjects()}>Projects</Link>
                <Link color="white" mr={4} onClick={() => goToConsultations()}>Consultation</Link>
                <Link color="white" mr={4} onClick={() => handleSignIn()}>{user ? "Sign out" : "Sign In"}</Link>
            </Box>
        </Flex>
    );
}
export default Navbar;
