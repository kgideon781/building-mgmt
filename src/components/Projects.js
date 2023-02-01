import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Flex, FormControl, FormLabel,
    Icon,
    Image, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner,
    Text, Textarea,
    useDisclosure
} from "@chakra-ui/react";
import BannerImg from "../assets/bg-projects.jpg";
import {Link,useNavigate} from "react-router-dom";
import {useCollection} from "react-firebase-hooks/firestore";
import {auth, db, storage} from "../firebase.js";

import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {FcPlus} from "react-icons/fc";



const Projects = () => {
    const currentUser = auth.currentUser;
    const navigate = useNavigate()
    const [projectsRef, loading, error] = useCollection(db.collection("projects"))
    const [editProject, setEditProject] = useState(false)
    const userRef = currentUser && db.collection("users").doc(currentUser.uid)
    const [userIsAdmin, setUserIsAdmin] = useState(false)
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    //const [photo, setPhoto] = useState();
    //Popup variables
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isUserAdmin = async () => {
        await userRef?.onSnapshot((doc) => {
            const isAdmin = doc.data().admin;
           // isAdmin && setEditProject(true)
            isAdmin && setUserIsAdmin(true)
            console.log("isAdmin: ", isAdmin)
        })
    }
    const addNewProject = async () => {
       // setIsLoading(true);
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`projects/${file.name}`);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();

            await db.collection("projects").add({
                name: name,
                description: description,
                photo: downloadURL,
            }, {merge: true}).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully with image")
                onClose()
            })
        } else {
            await db.collection("projects").add({
                name: name,
                description: description,
            }).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully without image")
                onClose()
            })
        }
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        isUserAdmin()
        console.log(isLoading)
    }, [currentUser])

    return (
        <Box>
            {/*Banner area*/}
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height="390px"
                backgroundImage={`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${BannerImg})`}
                backgroundPosition={["center", "top", "center", "center"]}
                backgroundRepeat="no-repeat"
                //backgroundOverlay="linear-gradient(0deg, rgba(255,0,150,0.8), rgba(255,0,150,0.8))"
            >
                <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <Flex>
                        <Text color="white" fontSize="5xl" fontWeight="bold">Projects</Text>
                    </Flex>
                    <Flex maxW={"70%"} >
                        <Text color="white" fontSize={["lg","2xl"]} textAlign={"center"} p={10}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut

                        </Text>
                    </Flex>

                </Flex>

            </Box>

            {/*CTA Area*/}
            <Box background={"blackAlpha.150"}>
                <Flex justifyContent={"center"} alignItems={"center"} p={"5%"}>
                    <Box>
                        <Flex>
                            <Text fontFamily={"sans-serif"} fontSize={["3xl", "5xl"]} textAlign={"center"} fontWeight={"bold"} lineHeight={"1em"}>ARE YOU READY TO BUILD NEW PROJECT WITH US?</Text>
                        </Flex>

                        <Flex pl={["0","10%"]} pr={["0","10%"]} pb={["2%"]} pt={["2%"]}>
                            <Text fontSize={["16px", "16px"]} textAlign={"center"}>sed accumsan urna quam non urna. Nullam a magna nibh. Maecenas hendrerit, dolor quis dignissim imperdiet, magna erat tincidunt tellus, a finibus nisl leo ac mauris. </Text>
                        </Flex>
                        <Flex justifyContent={"center"} pt={"2%"}>
                            <Button fontFamily={"sans-serif"} fontSize={"15px"} p={"15px 30px"} background={"orange"} textTransform={"uppercase"} color={"white"}>Contact us</Button>
                        </Flex>
                    </Box>

                </Flex>
            </Box>

            {/*Content area*/}

            <Flex justifyContent={"center"} p={"5% 2%"} background={"blackAlpha.50"}>
                <Box >
                    <Flex justifyContent={"center"} >
                        <Text fontSize={"20px"} textAlign={"center"} fontFamily={"sans-serif"} color={"orange"} fontWeight={"bold"}>Our Projects</Text>
                    </Flex>
                    <Flex justifyContent={"center"} >
                        <Text fontSize={["38px", "48px"]} textAlign={"center"} fontFamily={"sans-serif"} fontWeight={"bold"}>FEATURED WORKS</Text>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Text textAlign={"center"} width={["90%","70%"]}>
                            Select the type of construction you are planning to undertake and get to know what you need to accomplish that.
                        </Text>
                    </Flex>
                    <Flex justifyContent={"flex-end"} mt={"-2%"}>
                        <Button mr={"2px"} display={userIsAdmin ? "block" : "none"} fontFamily={"sans-serif"} leftIcon={<AiFillEdit/>} fontSize={"15px"} p={"5px"} background={"orange"} textTransform={"uppercase"} color={"white"} onClick={() => setEditProject(true)}>Edit</Button>
                        <Button display={editProject ? "block" : "none"} fontFamily={"sans-serif"} leftIcon={<FcPlus/>} fontSize={"15px"} p={"5px"} background={"orange"} textTransform={"uppercase"} color={"white"} onClick={onOpen}>Add new</Button>
                    </Flex>



                    <Flex justifyContent={"center"} flexWrap={"wrap"} p={["5%", "1%"]}>
                        {/*Items 1*/}


                        {projectsRef?.docs.map((doc, id) => {
                            return (
                                <Box m={"2% 2px"} key={id}>
                                    <Link margin={"2%"} key={id} to={{
                                        pathname: `/projects/${doc.id}`,

                                    }}>

                                        <Box w={"347px"} maxW={"347px"}>
                                            <Flex justifyContent={"center"} flexDirection={"column"}>
                                                <Flex>
                                                    <Image w={"347px"} h={"230px"} src={doc.data().photo} alt="Segun Adebayo" />
                                                </Flex>
                                                <Box background={"white"}>
                                                    <Box background={"white"} opacity={"0.7"} mt={"-20px"} p={"5%"} borderRadius={"10px"} shadow={"1px"} border={"1px solid white"}>
                                                        <Box>
                                                            <Flex justifyContent={"center"} pt={"15%"} background={"white"}>
                                                                <Text textAlign={"center"} lineHeight={"1em"} fontSize={"24px"} fontFamily={"sans-serif"} fontWeight={"bold"} color={"orange"}>{doc.data().name}</Text>
                                                            </Flex>
                                                            <Flex>
                                                                <Text fontSize={"16px"} m={"10px 0 14px"} fontFamily={"sans-serif"} textAlign={"center"}>Aenean tempus risus arcu, eu interdum ex sollicitudin ut. Phasellus malesuada quam id arcu tempor, a fringilla velit cursus.</Text>
                                                            </Flex>
                                                        </Box>


                                                    </Box>
                                                </Box>
                                            </Flex>


                                        </Box>
                                    </Link>
                                </Box>

                                )

                        })}

                    </Flex>


                </Box>

            </Flex>


            {/*Modal for adding new project*/}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Project Name</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Short description</FormLabel>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>File</FormLabel>
                            <Input type="file" onChange={handleFileChange} />
                        </FormControl>
                        {file && (
                            <Box mt={4}>
                                <Image src={URL.createObjectURL(file)} />
                            </Box>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={() => {
                            setIsLoading(true);
                            addNewProject().then(r => setIsLoading(false));

                        }}>
                            {isLoading ? <Spinner /> : "Save"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
};

export default Projects;