import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Flex, FormControl, FormLabel,
    Icon,
    Image, Input, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner,
    Text, Textarea, useDisclosure
} from "@chakra-ui/react";
import {auth, db, storage} from "../firebase.js";
import {useCollection} from "react-firebase-hooks/firestore";
import bg_projects from "../assets/bg-projects.jpg"
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";
import {FcPlus} from "react-icons/fc";

const ProjectDetails = () => {

    const currentUser = auth.currentUser;
    const url = window.location.pathname;
    const urlParts = url.split('/');

    const projectID = urlParts.pop();
    //console.log(`ProjectID: ${projectID}`);
    const projectRef = db.collection("projects").doc(projectID)
    const [projectPhoto, setProjectPhoto] = useState();
    const [projectName, setProjectName] = useState("");
    const [projectGuidelines, setProjectGuidelines] = useState();
    const [projectEquipments, setProjectEquipments] = useState();
    const [projectPermits, setProjectPermits] = useState();
    const [projectConclusion, setProjectConclusion] = useState();

    const navigate = useNavigate();

    const [equipsRef, loading] = useCollection(projectName && db.collection("equipment").where("nature", "array-contains", projectName.toLowerCase()))

    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toggle, setToggle] = useState("projects");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [editProject, setEditProject] = useState(false)
    const userRef = currentUser && db.collection("users").doc(currentUser.uid)
    const [userIsAdmin, setUserIsAdmin] = useState(false)


    //Contracrors variable
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [nature, setNature] = useState(["painting", "house renovation", "flooring"]);
    const [experience, setExperience] = useState();
    const [website, setWebsite] = useState();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const getProjectDetails = async () => {
        projectRef.onSnapshot((doc) => {
            //console.log(doc.data().photo)
            setProjectPhoto(doc.data().photo)
            setProjectName(doc.data().name)
            setProjectGuidelines(doc.data().guidelines)
            setProjectEquipments(doc.data().equipment)
            setProjectPermits(doc.data().permits)
            setProjectConclusion(doc.data().conclusion)
        })
    }

    useEffect(() => {
        console.log(projectName)
        getProjectDetails()
        isUserAdmin();
        equipsRef?.docs.map((val) => {
            console.log(val.data().company)
        })
    },[])

    const saveProject = async () => {
        setIsLoading(true);
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`projects/${file.name}`);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();

            await db.collection("projects").doc(projectID).set({
                name: projectName,
                description: projectGuidelines,
                photo: downloadURL,
            }, {merge: true}).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully with image")
                onClose()
            })
        } else {
            await db.collection("projects").doc(projectID).update({
                name: projectName,
                description: projectGuidelines,
            }).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully without image")
                onClose()
            })
        }
    }

    const saveContractor = async () => {
        setIsLoading(true);
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`contractors/${file.name}`);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();

            await db.collection("contractors").add({
                company: company,
                address: address,
                description: description,
                nature: nature,
                experience: experience,
                website: website,
                photo: downloadURL,
            }).then(() => {
                setIsLoading(false);
                console.log("Contractor added successfully with image")
               // onClosed()
            })
        } else {
            await db.collection("contractors").add({
                company: company,
                address: address,
                description: description,
                nature: nature,
                experience: experience,
                website: website,
            }).then(() => {
                setIsLoading(false);
                console.log("Contractor added successfully without image")
                //onClosed()
            })
        }
    }
    const handleDelete = async () => {
        setIsLoading(true);
        await db.collection("projects").doc(projectID).delete().then(() => {
            console.log("Project deleted successfully")
            navigate("/projects")
        });
        setIsLoading(false);
    };

    const isUserAdmin = async () => {
        await userRef.onSnapshot((doc) => {
            const isAdmin = doc.data().admin;
            // isAdmin && setEditProject(true)
            isAdmin && setUserIsAdmin(true)
        })
    }

    // console.log(itemID)

    return (
        <>
            {loading ? <Flex justifyContent={"center"} alignItems={"center"}><Spinner /></Flex> :
                <Box>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Image objectFit={"cover"} height={"50vh"} width={"100%"} src={projectPhoto}/>
                    </Flex>
                    <Box pt={"1%"} mr={"2%"}>
                        <Flex justifyContent={"flex-end"}>
                            <Box onClick={() => setToggle("projects")} mr={"3%"}>
                                <Button borderRadius={"15px"}  display={userIsAdmin ? "block" : "none"} leftIcon={<AiFillEdit/>} color={"green"} onClick={onOpen}>Edit</Button>

                            </Box>
                            <Button borderRadius={"15px"} display={userIsAdmin ? "block" : "none"} leftIcon={<AiFillDelete/>} color={"red"} onClick={() => setIsDeleteOpen(true)}>Delete</Button>
                        </Flex>
                    </Box>
                    <Flex justifyContent={"center"} p={"0 4%"}>
                        <Text fontSize={["38px", "48px"]} fontWeight={"bold"}>{projectName}</Text>
                    </Flex>
                    <Flex justifyContent={"center"} p={"0 4% 2% 4%"}>
                        <Text fontSize={["16px", "lg"]}>{projectGuidelines}</Text>
                    </Flex>
                    <Box p={"0 4% 2% 4%"}>
                        <Text fontWeight={"bold"}>Equipments:</Text>
                        <Flex justifyContent={"center"} >
                            <Text fontSize={["16px", "lg"]}>{projectEquipments}</Text>
                        </Flex>
                    </Box>

                    <Box p={"0 4% 2% 4%"}>
                        <Text fontWeight={"bold"}>Permits and Certifications:</Text>
                        <Flex justifyContent={"center"}>
                            <Text fontSize={["16px", "lg"]}>{projectPermits}</Text>
                        </Flex>
                    </Box>
                    <Flex justifyContent={"center"} p={"0 4% 2% 4%"}>
                        <Text fontSize={["16px", "lg"]}>{projectConclusion}</Text>
                    </Flex>

                </Box>
                <Flex justifyContent={"center"} p={"5% 2%"} background={"blackAlpha.50"} flexDirection={"column"}>
                    <Box>
                        <Flex justifyContent={"center"}>
                            <Text fontSize={"48px"} textAlign={"center"} fontFamily={"sans-serif"} color={"orange"} fontWeight={"bold"}>Work With the Best</Text>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <Text fontSize={"25px"} textAlign={"center"} fontFamily={"sans-serif"} fontWeight={"bold"}>Suggested Contractors</Text>
                        </Flex>
                        <Flex justifyContent={"flex-end"} mt={"-2%"}>
                            <Button mr={"2px"} display={userIsAdmin ? "block" : "none"} fontFamily={"sans-serif"} leftIcon={<AiFillEdit/>} fontSize={"15px"} p={"5px"} background={"orange"} textTransform={"uppercase"} color={"white"} onClick={() => {
                                setEditProject(true)
                                setToggle("contractors");
                            }}>Edit</Button>
                            <Button display={editProject ? "block" : "none"} fontFamily={"sans-serif"} leftIcon={<FcPlus/>} fontSize={"15px"} p={"5px"} background={"orange"} textTransform={"uppercase"} color={"white"}
                                    onClick={onOpen}>Add new</Button>
                        </Flex>

                    </Box>
                    <Box>
                        <Flex justifyContent={"center"} alignItems={"flex-start"} flexWrap={"wrap"} boxShadow={"1"} >
                            {equipsRef?.docs.map((val, id) => {
                                return (
                                    <Box key={id} m={"2%"} borderRadius={"10px"} background={"blackAlpha.100"} w={"350px"} maxW={"400px"} >
                                        <Image height={"20px"} width={"100%"} src={val.data().background} alt={"background"} objectFit={"cover"}/>
                                        <Box padding={"2%"}>
                                            <Flex>
                                                <Text fontWeight={"bold"}>{val.data().company}</Text>
                                            </Flex>
                                            <Flex>

                                                <Text fontSize={"sm"}>{val.data().address}</Text>
                                            </Flex>
                                            <Flex alignItems={"center"}>
                                                <Box width="auto" mr={"2px"}>
                                                    {val.data().verified ?
                                                        <Flex justifyContent={"center"} alignItems={"center"} background={"green.400"} color={"white"} borderRadius={"10px"} p={"2px 5px"}>
                                                            <Icon boxSize={6} as={AiOutlineCheck} pr={"5px"} borderRight={"1px solid white"}/>
                                                            <Text background={"green.400"} color={"white"} borderRadius={"10px"} p={"2px 5px"}>Verified</Text>
                                                        </Flex>

                                                        :
                                                        <Text background={"white"} borderRadius={"10px"} p={"2px"}>Unverified</Text>}
                                                </Box>
                                                <Box width={"auto"}>
                                                    <Flex borderRadius={"10px"} border={"1px solid black"} p={"2px 5px"}>
                                                        <Text fontSize={"sm"}>{val.data().experience && `+${val.data().experience} years with us`}</Text>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            <Flex width={"100%"} >
                                                <Box>
                                                    <Text fontWeight={"bold"} mb={"5px"}>Specializes in:</Text>
                                                    <Box display={"flex"} flexWrap={"wrap"}>
                                                        {val.data().nature?.map((nat, id) => {
                                                            return (
                                                                <Flex justifyContent={"center"} m={"2px"} borderRadius={"10px"} border={"1px solid orange"} background={"orange.100"}>
                                                                    <Text p={"2px"}>{nat}</Text>
                                                                </Flex>

                                                            )
                                                        })}

                                                    </Box>

                                                </Box>
                                            </Flex>
                                            <Flex pt={"5%"} pb={"2%"} justifyContent={"flex-end"}>
                                                <Box>
                                                    <Button onClick={() => navigate(`/equipment/${val.id}`)}>Learn more</Button>
                                                </Box>
                                            </Flex>
                                        </Box>

                                    </Box>
                                )
                            })}
                        </Flex>

                    </Box>

                </Flex>

                    {/*Project Edit Popup*/}
                    <Modal isOpen={isOpen} onClose={onClose} toggle={toggle}>
                        <Flex justifyContent={"space-between"} m={"2px 2%"}>
                            <Button onClick={() => setToggle("project")}>Edit Project</Button>
                            <Button onClick={() => setToggle("contractor")}>Add Contractor</Button>
                        </Flex>

                        {toggle === "projects" ?
                            <Box>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit Project</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Project Name</FormLabel>
                                        <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Permits and Certifications</FormLabel>
                                        <Textarea value={projectPermits} onChange={(e) => setProjectPermits(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Equipments needed for the project</FormLabel>
                                        <Textarea value={projectEquipments} onChange={(e) => setProjectEquipments(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Construction Guidelines</FormLabel>
                                        <Textarea value={projectGuidelines} onChange={(e) => setProjectGuidelines(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Conclusion</FormLabel>
                                        <Textarea value={projectConclusion} onChange={(e) => setProjectConclusion(e.target.value)} />
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
                                        saveProject();

                                    }}>
                                        {isLoading ? "Saving..." : "Save"}
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Box>
                        :
                        <Box>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit Contractor Details</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Company Name</FormLabel>
                                        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Address and Location</FormLabel>
                                        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Company Description</FormLabel>
                                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Experience in Years. (Numbers only)</FormLabel>
                                        <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Website</FormLabel>
                                        <Textarea value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Company profile Image</FormLabel>
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
                                        saveContractor().then(() => {
                                            setIsLoading(false);
                                        });

                                    }}>
                                        {isLoading ? <Spinner/> : "Save"}
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Box>}

                    </Modal>

                    {/*Delete confirmation Popup*/}
                    <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Item</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>Are you sure you want to delete this Project?</ModalBody>
                            <ModalFooter>
                                <Button variantColor="red" mr={3} onClick={handleDelete} isLoading={isLoading}>
                                    Yes
                                </Button>
                                <Button onClick={() => setIsDeleteOpen(false)}>No</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>


            </Box>
            }
        </>

    );
};

export default ProjectDetails;