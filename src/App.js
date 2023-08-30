import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Center,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import BusinessForm from "./components/BusinessForm";
import AccountingProvider from "./components/AccountingProvider";
import ApplicationStatus from "./components/ApplicationStatus";
import BalanceSheetForm from "./components/BalanceSheetForm"; // Import BalanceSheetForm

function App() {
  const [business, setBusiness] = useState({});
  const [applicationStatus, setApplicationStatus] = useState("");
  const [balanceSheetData, setBalanceSheetData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const accountingProviders = [
    { id: 1, name: "Xero" },
    { id: 2, name: "MYOB" },
    // Add more provider options as needed
  ];

  const handleProviderSelection = (selectedProvider) => {
    // Logic to handle the selected provider
    console.log("Selected Provider:", selectedProvider);
  };

  const handleBusinessSubmit = (businessData) => {
    setBusiness(businessData);
  };

  useEffect(() => {
    if (business.id) {
      handleFetchBalanceSheet();
    }
  }, [business]);

  const handleApplicationSubmit = async (business) => {
    // Submit application logic
    // Set application status based on the result
    try {
      console.log("***", business);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/submit-application/",
        {
          balanceSheetData: balanceSheetData,
          business: business,
        }
      );
      const data = response.data;
      console.log(data);
      setBalanceSheetData(data); // Set the fetched balance sheet data
      onOpen(); // Open the modal to display the BalanceSheetForm
    } catch (error) {
      console.error("Error in Submitting data", error);
    }
    setApplicationStatus("Approved");
  };

  const handleFetchBalanceSheet = async () => {
    try {
      // Fetch balance sheet data from API
      console.log("****", business.id);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/balance-sheet/",
        {
          params: {
            business_id: business.id, // Send the selected business ID
          },
        }
      );
      const data = response.data;
      console.log(data);
      setBalanceSheetData(data); // Set the fetched balance sheet data
      onOpen(); // Open the modal to display the BalanceSheetForm
    } catch (error) {
      console.error("Error fetching balance sheet data:", error);
    }
  };

  return (
    <ChakraProvider>
      <Center
        h={"4xl"}
        bgGradient="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(113,170,236,1) 100%)"
      >
        <Box className="App">
          <Heading as="h1" mb="4" mt="10">
            Business Loan Application
          </Heading>
          <BusinessForm onSubmit={handleBusinessSubmit} />

          <AccountingProvider
            providers={accountingProviders}
            onSelectProvider={handleProviderSelection}
          />
          <Center>
            <Button colorScheme="blue" onClick={handleFetchBalanceSheet} mt="4">
              Request Balance Sheet
            </Button>
          </Center>

          <ApplicationStatus status={applicationStatus} />

          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Balance Sheet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Pass the fetched balance sheet data to the BalanceSheetForm */}
                <BalanceSheetForm
                  onSubmit={(formData) => {
                    // Handle the submission logic here
                    console.log("Balance Sheet Form Data:", formData);
                    // You can send the form data to your API for creation
                    // and handle the response accordingly
                  }}
                  balanceSheetData={balanceSheetData}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => handleApplicationSubmit(business)}
                >
                  Approve
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
