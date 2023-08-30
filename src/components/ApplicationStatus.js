import React from "react";
import { Center, Text } from "@chakra-ui/react";

const ApplicationStatus = ({ status }) => {
  const textColor = status === "Approved" ? "green" : "black";

  return (
    <Center>
      <Text fontSize="xl" fontWeight="bold" mt={4} color={textColor}>
        Application Status: {status}
      </Text>
    </Center>
  );
};

export default ApplicationStatus;
