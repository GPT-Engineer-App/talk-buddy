import React, { useState } from "react";
import { Box, VStack, HStack, Text, Avatar, Input, Button, Divider, Heading } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatMessage = ({ message, sender }) => (
  <Box bg={sender === "me" ? "blue.500" : "gray.100"} color={sender === "me" ? "white" : "black"} borderRadius="lg" p={2} maxW="70%" alignSelf={sender === "me" ? "flex-end" : "flex-start"}>
    {message}
  </Box>
);

const ChatContact = ({ name, avatar, lastMessage, onClick }) => (
  <HStack p={2} spacing={4} _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={onClick}>
    <Avatar name={name} src={avatar} />
    <VStack align="start" spacing={0}>
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="sm" color="gray.500" noOfLines={1}>
        {lastMessage}
      </Text>
    </VStack>
  </HStack>
);

const Index = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZW1wbG95ZWUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTIzNjcxNDB8MA&ixlib=rb-4.0.3&q=80&w=1080",
      lastMessage: "Hey there!",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbXBsb3llZSUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMjM2NzE0MXww&ixlib=rb-4.0.3&q=80&w=1080",
      lastMessage: "How's it going?",
    },
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "me" }]);
      setInputMessage("");
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8}>
      <Heading mb={4}>WhatsApp Clone</Heading>
      <HStack spacing={4} h="500px">
        <VStack w="30%" bg="white" p={4} overflowY="auto">
          {contacts.map((contact) => (
            <ChatContact key={contact.id} {...contact} onClick={() => handleContactClick(contact)} />
          ))}
        </VStack>
        <VStack w="70%" bg="white" p={4} spacing={4}>
          {selectedContact ? (
            <>
              <HStack w="100%" spacing={4}>
                <Avatar name={selectedContact.name} src={selectedContact.avatar} />
                <Text fontWeight="bold">{selectedContact.name}</Text>
              </HStack>
              <Divider />
              <VStack spacing={2} overflowY="auto" w="100%" flex={1}>
                {messages.map((message, index) => (
                  <ChatMessage key={index} {...message} />
                ))}
              </VStack>
              <HStack w="100%">
                <Input placeholder="Type a message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                <Button colorScheme="blue" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
                  Send
                </Button>
              </HStack>
            </>
          ) : (
            <Text>Select a contact to start chatting</Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default Index;
