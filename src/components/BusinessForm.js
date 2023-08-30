import React, { useState } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const BusinessForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [year_established, setYearEstablished] = useState("");
  const [loan_amount, setLoanAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, year_established, loan_amount };

    try {
      // Make a POST request to add the data
      const response = axios.post(
        "http://127.0.0.1:8000/api/business/",
        formData
      );

      // If the request is successful, call the onSubmit callback
      if (response.status === 201) {
        onSubmit(formData);
        // Clear the form inputs
        setName("");
        setYearEstablished("");
        setLoanAmount("");
      }
    } catch (error) {
      console.error("Error adding business data:", error);
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch" w={300}>
          <FormControl>
            <FormLabel>Business Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Business Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year Established</FormLabel>
            <Input
              type="number"
              value={year_established}
              onChange={(e) => setYearEstablished(e.target.value)}
              placeholder="Year Established"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Loan Amount</FormLabel>
            <Input
              type="number"
              value={loan_amount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Loan Amount"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Center>
  );
};

export default BusinessForm;
