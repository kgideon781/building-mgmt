import React, {useState} from 'react';
import {Box, Button, Flex, FormControl, GridItem, Input, Text, Textarea, Toast, useToast} from "@chakra-ui/react";
import {ImGooglePlus} from "react-icons/im";
import {Link} from "react-router-dom";
import {db} from "../firebase";


const Consultation = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const toast = useToast()

    const handleSendMessage = () => {
        db.collection('consultations').add({name, email, message}).then(r => {
            toast({
                title: `Message sent!`,
                description: "One of our consultants will get back to soon",
                status: "success",
                duration: 9000,
                isClosable: true,

            });
        });
    }

    return (
        <Box>
            <Flex justifyContent={"space-between"}>
                <Box>

                </Box>
                <Box
                    borderWidth="1px"
                    rounded="lg"
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    maxWidth={800}
                    p={6}
                    m="10px auto"
                    as="form">
                    <Flex justifyContent={"space-between"}>

                        <Box>
                            <Flex justifyContent={"center"}  mb="2%">
                                <Text textAlign={"center"}  fontSize={25} color={"black"}>We are here to help you</Text>
                            </Flex>
                            <Flex justifyContent={"center"} mb="2%">
                                <Text textAlign={"center"} fontSize={"md"} color={"black"} mb="2%">Our team is made up of highly qualified professionals who are dedicated to providing you with the best advice and guidance. Whether you're looking for help with a specific problem or just want to learn more about a particular topic, we're here to help. Please take a moment to browse our available consultation options and schedule a session that works for you. We look forward to working with you! </Text>
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Text justifyContent={"center"} fontSize={"sm"} color={"black"} mb="2%">We need you to sign in for identification purposes only.</Text>
                            </Flex>

                            <FormControl mr="5%" mt="2%" as={GridItem} colSpan={[6, 3]}>
                                <Input
                                    type="name"
                                    placeholder="Name"
                                    value={name}
                                    required={true}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>

                            <FormControl mt="2%">
                                <Input
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>

                            <FormControl mt="2%">
                                <Textarea
                                    type="text"
                                    placeholder="message"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>

                            <Flex flexDirection={"column"} >
                                <Button mt="2%" colorScheme="teal" onClick={handleSendMessage}>
                                    Submit
                                </Button>


                            </Flex>
                        </Box>


                    </Flex>


                </Box>
            </Flex>

        </Box>

    );
};

export default Consultation;