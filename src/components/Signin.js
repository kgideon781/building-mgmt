import React, {useEffect, useState} from "react";
import {auth, db, provider} from "../firebase";

import {FormControl, Input, Button, Flex, GridItem, Box, useToast, Text} from "@chakra-ui/react";
import {ImGooglePlus} from "react-icons/im";
import {Link, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";





const SignIn = () => {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [newUser, setNewUser] = useState(false)
    const [error, setError] = useState(null);
    const toast = useToast();
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth);
   // const currentUser = auth.currentUser;

    useEffect(() => {
        //console.log(currentUser)
        user ? navigate("/") : navigate("/signin")
        //console.log("UseEffect executed")
    }, [user])

    const createUserWithEmailPwd = () => {
        if (password !== cpassword){
            toast({
                title: `Passwords do not match. Try again!`,
                status: "error",
                duration: 9000,
                isClosable: true,

            });
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCreds) => {
                const user = userCreds.user
                addUToDB(user).then((r) => {
                    toast({
                        title: `User ${user.email} created!`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,

                    });
                })
                navigate("/profile-setup/:id")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                // ..
                console.log(errorCode+" caused by "+errorMessage)
            });
    }
    const signUpInstead = () => {
        setNewUser(true)
    }
    const signInInstead = () => {
        setNewUser(false)
    }


    const addUToDB = async (user) => {
        const collectionRef = db.collection( "users").doc(user.uid)
        const payload = {
            displayName: fullname,
            email: user.email,
            uid: user.uid,
        }
        await collectionRef.set({payload},{merge: true})

    }
    const addToDB = async (user) => {
        const collectionRef = db.collection("users").doc(user.uid)
        const payload = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
        }
        await collectionRef.set({payload},{merge: true})


    }

    const handleSignUp = async () => {

        try {
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user
                    console.log(user.displayName)

                    addToDB(user)

                    newUser ? navigate("/profile-setup/:id") : navigate("/")
                }).then(() =>{

                /*toast({
                    title: `user created!`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,

                });*/

            })

        }
        catch (error) {
            alert(error.message)
        }

    };
    const handleSignIn = async () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("user signed in!");
                toast({
                    title: "Login successful.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                //navigate("/")
            })
            .catch((error) => {
                setError(error.message);
                toast({
                    title: "Email or password is incorrect! Please confirm and try again.",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });
    };


    return (
        <>
            {loading ? <Text>Loading...</Text> : (<Box>
                {newUser ?
                    <Box mb="15px">


                        <Box
                            borderWidth="1px"
                            rounded="lg"
                            shadow="1px 1px 3px rgba(0,0,0,0.3)"
                            maxWidth={800}
                            p={6}
                            m="10px auto"
                            as="form">
                            <Flex justifyContent={"center"}>
                                <Text justifyContent={"center"} fontSize={25} color={"black"}>Sign Up!</Text>
                            </Flex>


                            <Flex justifyContent={"center"}>
                                <Text justifyContent={"center"} fontSize={"sm"} color={"black"} mb="2%">All fields are mandatory.</Text>
                            </Flex>

                            <FormControl mr="5%" mt="2%" as={GridItem} colSpan={[6, 3]}>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mr="5%" mt="2%" as={GridItem} colSpan={[6, 3]}>
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullname}
                                    required={true}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt="2%">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt="2%">
                                <Input
                                    required={true}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                />
                            </FormControl>
                            <Flex flexDirection={"column"} width="100%">


                                <Button mt="2%" mb="2%" colorScheme="teal" onClick={createUserWithEmailPwd}>
                                    Sign Up
                                </Button>



                                <Button

                                    colorScheme="red"
                                    leftIcon={<ImGooglePlus/>}
                                    onClick={handleSignUp}
                                >Sign up with Google</Button>



                            </Flex>

                            {/*{error && <p>{error}</p>}*/}
                        </Box>
                        <Flex m="10px auto" justifyContent={"center"}>

                            <Button mt="2%" mb="2%" colorScheme="teal" onClick={signInInstead}>
                                Sign in instead
                            </Button>
                        </Flex>
                        <Flex>
                            {error && <Text>{error}</Text>}
                        </Flex>
                    </Box>
                    :
                    <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        as="form">
                        <Flex justifyContent={"center"}  mb="2%">
                            <Text textAlign={"center"}  fontSize={25} color={"black"}>Hi, Welcome. Please sign in to continue</Text>
                        </Flex>
                        <Flex justifyContent={"center"} mb="2%">
                            <Text textAlign={"center"} fontSize={"md"} color={"black"} mb="2%">If you select the option to log in with Google, please make sure to use an account that has your official name in it, so it can be easily identified, or click <b>"Sign up instead"</b> to provide the details.</Text>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <Text justifyContent={"center"} fontSize={"sm"} color={"black"} mb="2%">We need you to sign in for identification purposes only.</Text>
                        </Flex>

                        <FormControl mr="5%" mt="2%" as={GridItem} colSpan={[6, 3]}>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt="2%">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Flex flexDirection={"column"} >
                            <Button mt="2%" colorScheme="teal" onClick={handleSignIn}>
                                Sign In
                            </Button>

                            <Button
                                mt="2%"
                                colorScheme="red"
                                leftIcon={<ImGooglePlus/>}
                                onClick={handleSignUp}
                            >Sign in with Google</Button>
                            {error && <Text>{error}</Text>}
                        </Flex>
                        <Flex justifyContent={"flex-end"} mt={"2%"}>
                            <Link onClick={signUpInstead} to={"/signin"}><Text decoration={"underline"}>Sign up instead</Text></Link>
                        </Flex>

                        {/*{error && <p>{error}</p>}*/}
                    </Box>
                }
            </Box>)}
        </>
    );
};

export default SignIn;
