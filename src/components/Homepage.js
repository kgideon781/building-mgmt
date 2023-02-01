import React from 'react';
import {Box, Button, Flex, Icon, Text} from "@chakra-ui/react";
import HeroImg from "../assets/bg-04.jpg";
import {GiTowTruck, } from "react-icons/gi";
import {MdEngineering} from "react-icons/md"
import {SiKakao, SiKakaotalk} from "react-icons/si";
import {TbCertificate} from "react-icons/tb";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../firebase";

const Homepage = () => {
    const currentUser = auth.currentUser;


    const navigate = useNavigate()

    return (
        <Box >
            {/* ==============================Start of Hero Section====================================*/}
            <Box

                height={["70vh","90vh"]}
                backgroundImage={`url(${HeroImg})`}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"

            >
                <Box justifyContent={"center"}>
                    <Flex justifyContent={"center"} >
                        <Text maxW={["400","600px"]} ml={["2px", "30%"]} textAlign={["center", "right"]} lineHeight={["0.9em", "1.2em"]}  fontSize={["2xl", "4xl"]} pt={["1%","2%"]} fontWeight={"bold"}>Welcome, {currentUser && currentUser.displayName} to the future of construction</Text>
                    </Flex>

                </Box>
                {/*Container for hero section text*/}
                <Flex height={"100%"} justifyContent={"space-between"} alignItems={["flex-start","center"]} mr={["0", "20%"]} >
                    <Flex>

                    </Flex>
                    <Flex flexDirection={"column"} p={"2%"}  mt={["5%", "0"]}>
                        {/*Two bounding boxes for Tagline in orange and summary in Black*/}
                        <Box
                            background={"#EB8834"}
                            width={["99%", "420px"]}
                            height={["144px", "144px"]}
                            borderRadius="10px"
                            mr={["2%","20%"]}
                            ml={["1%","0"]}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            p={["20px","30px"]}
                            mb={"5%"}
                        >
                            <Text fontSize={["4xl", "5xl"]} textAlign={"center"} color={"white"} fontWeight={"bold"} lineHeight={"45px"}>Build a better world with us</Text>
                        </Box>
                        <Box
                            background={"#666666"}
                            width={["99%", "420px"]}
                            height="auto"
                            borderRadius="10px"
                            mr={["3%","20%"]}
                            ml={["1%","0"]}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            pr={["0px","30px"]}
                            pl={["10px","30px"]}
                            pb={["30px","30px"]}
                            pt={["30px","30px"]}


                        >
                            <Text color={"white"}>
                                Take the stress out of construction management. Sign up for our Building Construction Management System and stay organized, on budget, and on schedule.
                            </Text>


                        </Box>
                        <Box
                            ml={["1%","0"]}
                            height="auto"

                        >
                            <Flex  justifyContent={["center","space-between"]} pt={"5%"} flexDirection={["column", "row"]}>
                                <Button p={"7%"} mr={["0","2%"]} mb={["2%", "0"]} colorScheme={"orange"} onClick={() => navigate("/signin")}>Sign In</Button>
                                <Button p={"7%"} colorScheme={"orange"} onClick={() => navigate("/signin")}>Sign Up</Button>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>

            </Box>

            {/*===================================End of Hero sction==============================*/}

            {/*===================================Start of Services Section=======================*/}
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"} pb={"10%"}>
                <Box p={"3%"}>
                    <Flex justifyContent={"center"} >
                        <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight={"bold"}>Services</Text>
                    </Flex>
                    <Flex justifyContent={"center"} p={"2%"} pb={"4%"}>
                         <Text fontSize={["lg", "2xl"]} textAlign={"center"} color={"#666666"} fontWeight={"normal"}>We offer a wide range of services to help you build a better world</Text>
                    </Flex>
                </Box>

                <Box maxW={"80vw"}>
                    <Flex justifyContent={"center"} pb={"2%"} alignItems={"center"} flexWrap={"wrap"}>

                        {/*Service 1*/}
                        <Link to={"/projects"}>
                            <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} background="#F8F9FB" borderRadius={"7px"} m={"2px"}>
                                <Flex flexDirection={"column"} alignItems={"center"}>
                                    <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={GiTowTruck} />
                                    <Text  fontSize={["2xl",]} fontWeight={"bold"}>Equipment</Text>
                                    {/*Decribe the equipment service in the context of construction*/}
                                    <Text textAlign={"center"} p={"2%"} fontSize={"lg"} color={"#666666"} fontWeight={"normal"}>We offer a wide range of equipment to help you build a better world</Text>
                                </Flex>


                            </Box>
                        </Link>

                        {/*Service 2*/}
                        <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} border={"1px solid #F8F9FB"} borderRadius={"7px"} m={"2px"}>
                            <Flex flexDirection={"column"} alignItems={"center"}>
                                <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={TbCertificate} />
                                <Text  fontSize={["2xl",]} fontWeight={"bold"}>Permits and certificates</Text>
                                {/*Decribe the equipment service in the context of construction*/}
                                <Text textAlign={"center"} p={"2%"} fontSize={["lg"]} color={"#666666"} fontWeight={"normal"}>Our service is designed to help users save time and money by streamlining the permitting process, allowing them to focus on building their dream building.</Text>
                            </Flex>


                        </Box>
                        {/*Service 3*/}
                        <Link to={"/projects"}>
                            <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} background="#F8F9FB" borderRadius={"7px"} m={"2px"}>
                                <Flex flexDirection={"column"} alignItems={"center"}>
                                    <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={MdEngineering} />
                                    <Text  fontSize={["2xl",]} fontWeight={"bold"}>Contractors</Text>
                                    {/*Decribe the equipment service in the context of construction*/}
                                    <Text textAlign={"center"} p={"2%"} fontSize={["lg"]} color={"#666666"} fontWeight={"normal"}>Our system offers a convenient contractor service that connects you with certified and experienced professionals to ensure the success of your construction project.</Text>
                                </Flex>


                            </Box>
                        </Link>



                    </Flex>

                    <Flex justifyContent={"center"} pb={"2%"} flexWrap={"wrap"}>
                        {/*Service 4*/}
                        <Link to={"/consultation"}>
                            <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} border={"1px solid #F8F9FB"} borderRadius={"7px"} m={"2px"}>
                                <Flex flexDirection={"column"} alignItems={"center"}>
                                    <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={SiKakaotalk} />
                                    <Text  fontSize={["2xl",]} fontWeight={"bold"}>Consultations</Text>
                                    {/*Decribe the equipment service in the context of construction*/}
                                    <Text textAlign={"center"} p={"2%"} fontSize={["lg"]} color={"#666666"} fontWeight={"normal"}>Our system offers expert consultation services to provide professional advice and guidance for your construction project.</Text>
                                </Flex>


                            </Box>
                        </Link>


                        {/*Service 5*/}
                        <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} background="#F8F9FB" borderRadius={"7px"} m={"2px"}>
                            <Flex flexDirection={"column"} alignItems={"center"}>
                                <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={GiTowTruck} />
                                <Text  fontSize={["2xl",]} fontWeight={"bold"}>Equipment</Text>
                                {/*Decribe the equipment service in the context of construction*/}
                                <Text textAlign={"center"} p={"2%"} fontSize={["lg"]} color={"#666666"} fontWeight={"normal"}>We offer a wide range of equipment to help you build a better world</Text>
                            </Flex>


                        </Box>
                        {/*Service 6*/}
                        <Box width={"370px"} height={"315px"} display={"flex"} justifyContent={"center"} border={"1px solid #F8F9FB"}  borderRadius={"7px"} m={"2px"}>
                            <Flex flexDirection={"column"} alignItems={"center"}>
                                <Icon m={"2%"} boxSize={["50px", "60px", "70px"]} color={"#EB8834"} as={GiTowTruck} />
                                <Text  fontSize={["2xl",]} fontWeight={"bold"}>Equipment</Text>
                                {/*Decribe the equipment service in the context of construction*/}
                                <Text textAlign={"center"} p={"2%"} fontSize={["lg"]} color={"#666666"} fontWeight={"normal"}>We offer a wide range of equipment to help you build a better world</Text>
                            </Flex>


                        </Box>



                    </Flex>

                </Box>

            </Box>

            {/*===================================End of Services Section=======================*/}

        </Box>
    );
};

export default Homepage;