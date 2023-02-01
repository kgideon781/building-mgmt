import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, Button, Textarea, useDisclosure, Box, Image } from "@chakra-ui/react";

function EditModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <Button onClick={onOpen}>Edit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
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
                        <Button variantColor="blue" mr={3} onClick={onClose}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditModal;
