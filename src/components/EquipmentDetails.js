import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Flex, FormControl, FormLabel,
    Icon,
    Image, Input,
    Link,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Spinner,
    Text, Textarea, useDisclosure
} from "@chakra-ui/react";
import {auth, db, storage} from "../firebase";
import BannerImg from "../assets/bg-projects.jpg";
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const EquipmentDetails = () => {

    const url = window.location.pathname;
    const urlParts = url.split('/');
    const currentUser = auth.currentUser;;

    const projectID = urlParts.pop();
    const [company, setCompany] = useState();
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [verified, setVerified] = useState(false);
    const [experience, setExperience] = useState();
    const [background, setBackground] = useState();
    const [website, setWebsite] = useState();
    const [nature, setNature] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const options = ["true", "false"];

    const projectRef = db.collection("equipment").doc(projectID)

    const [editProject, setEditProject] = useState(false)
    const userRef = currentUser && db.collection("users").doc(currentUser.uid)
    const [userIsAdmin, setUserIsAdmin] = useState(false)


    const getEquipmentDetails = async () => {
        projectRef.onSnapshot((doc) => {
            //console.log(doc.data().photo)
            setCompany(doc.data().company)
            setAddress(doc.data().address)
            setDescription(doc.data().description)
            setVerified(doc.data().verified)
            setExperience(doc.data().experience)
            setNature(doc.data().nature)
            setBackground(doc.data().background)
            setWebsite(doc.data().website)
        })
    }

    const handleSelect = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const saveEquipment = async () => {
        //setIsLoading(true);
        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`equipment/${file.name}`);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();

            await db.collection("equipment").doc(projectID).set({
                company: company,
                address: address,
                description: description,
                verified: true,
                experience: experience,
                nature: nature,
                background: downloadURL,
                website: website,
            }, {merge: true}).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully with image")
                onClose()
            })
        } else {
            await db.collection("equipment").doc(projectID).update({
                company: company,
                address: address,
                description: description,
                verified: true,
                experience: experience,
                nature: nature,
                website: website,
            }).then(() => {
                setIsLoading(false);
                console.log("Project updated successfully without image")
                onClose()
            })
        }
    }
    const handleDelete = async () => {
        setIsLoading(true);
        await db.collection("projects").doc(projectID).delete()
            .then(() => {
                setIsLoading(false);
                console.log("Project deleted successfully")
                navigate("/projects")
            });
        setIsLoading(false);
    };

    const isUserAdmin = async () => {
        await userRef?.onSnapshot((doc) => {
            const isAdmin = doc.data().admin;
            console.log(isAdmin)
            isAdmin && setUserIsAdmin(true)
        })
    }

    useEffect(() => {
        //console.log(projectName)
        isUserAdmin();
        getEquipmentDetails();

    },[])
    return (
        <Box>
            <Box>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"50vh"}
                    width={"100%"}
                    backgroundImage={`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background})`}
                    backgroundPosition={"center"}
                    mb={"2%"}
                >
                    <Box>
                        <Text textAlign={"center"} fontSize={["38px", "48px"]} color={"white"} fontWeight={"bold"} mb={"5%"}>{company}</Text>
                        <Text textAlign={"center"} color={"white"}>{address}</Text>

                        <Box m={"5%"}>
                            <Flex justifyContent={"center"}>
                                {verified ? <Flex justifyContent={"center"} alignItems={"center"} background={"green.400"} color={"white"} borderRadius={"10px"} p={"2px 5px"}>
                                        <Icon boxSize={6} as={AiOutlineCheck} pr={"5px"} borderRight={"1px solid white"}/>
                                        <Text background={"green.400"} color={"white"} borderRadius={"10px"} p={"2px 5px"}>Verified</Text>
                                    </Flex>

                                    :
                                    <Text background={"white"} borderRadius={"10px"} p={"2px"}>Unverified</Text>}
                            </Flex>
                        </Box>

                    </Box>

                </Flex>
                <Box width={"100%"} pl={"4%"} pr={"4%"} pb={"5px"} borderBottom={"1px"} borderColor={"gray.100"}>
                    <Flex justifyContent={"space-evenly"}>
                        <Flex width={"100%"} mr={"5px"} flexWrap={"wrap"}>
                            <Flex alignItems={"center"} pr={"2%"} borderRight={"1px solid orange"}>
                                <Text p={"1%"} fontWeight={"bold"}>Projects completed:</Text><Text p={"1%"}>20</Text>
                            </Flex>

                            <Flex alignItems={"center"} pl={"2%"} pr={"2%"} borderRight={"1px solid orange"}>
                                <Text p={"1%"} fontWeight={"bold"}>Years experience:</Text><Text p={"1%"}> +{experience}</Text>
                            </Flex>

                        </Flex>
                        <Flex>
                            <Box pt={"1%"} mr={"2%"} flexWrap={"wrap"}>
                                <Flex justifyContent={"flex-end"}>
                                    <Button display={userIsAdmin ? "block" : "none"} borderRadius={"15px"} mr={"3%"} leftIcon={<AiFillEdit/>} color={"green"} onClick={onOpen}>Edit</Button>
                                    <Button display={userIsAdmin ? "block" : "none"} borderRadius={"15px"} leftIcon={<AiFillDelete/>} color={"red"} onClick={() => setIsDeleteOpen(true)}>Delete</Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>

                </Box>

                <Flex justifyContent={"center"} p={"2% 4% 2% 4%"}>
                    <Text fontSize={["16px", "lg"]}>{description}</Text>
                </Flex>
                <Flex width={"100%"} pl={"4%"} >
                    <Box>
                        <Text fontWeight={"bold"} mb={"5px"}>Specializes in:</Text>
                        <Box display={"flex"} flexWrap={"wrap"}>
                            {nature?.map((nat, id) => {
                                return (
                                    <Flex key={id} justifyContent={"center"} borderRadius={"10px"} border={"1px solid orange"} background={"orange.100"} m={"2px"}>
                                        <Text p={"2px"}>{nat}</Text>
                                    </Flex>

                                )
                            })}

                        </Box>

                    </Box>
                </Flex>

                <Box padding={"2% 4%"}>
                    <Button colorScheme={"orange"}>
                        <a href={website && website}>Visit website</a>
                    </Button>


                </Box>
            </Box>

            {/*Contractors Edit Popup*/}
            <Modal isOpen={isOpen} onClose={onClose}>
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
                            <FormLabel>Specializes in? e.g. building and construction, house renovation etc.</FormLabel>
                            <Textarea value={nature} onChange={(e) => setNature(e.target.value)} />
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
                            saveEquipment().then(() => {
                                setIsLoading(false);
                            });

                        }}>
                            {isLoading ? <Spinner/> : "Save"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/*Delete confirmation Popup*/}
            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure you want to delete this contractor?</ModalBody>
                    <ModalFooter>
                        <Button variantColor="red" mr={3} onClick={handleDelete} isLoading={isLoading}>
                            Yes
                        </Button>
                        <Button onClick={() => setIsDeleteOpen(false)}>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>

    );
};

export default EquipmentDetails;