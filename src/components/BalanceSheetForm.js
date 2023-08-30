import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const BalanceSheetForm = ({ onSubmit, balanceSheetData }) => {
  const [formData, setFormData] = useState({
    year: "",
    month: "",
    profitOrLoss: "",
    assetsValue: "",
  });

  useEffect(() => {
    if (balanceSheetData) {
      setFormData({
        year: balanceSheetData.year,
        month: balanceSheetData.month,
        profitOrLoss: balanceSheetData.profit_or_loss,
        assetsValue: balanceSheetData.assets_value,
      });
    }
  }, [balanceSheetData]);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Year</Th>
          <Th>Month</Th>
          <Th>Profit or Loss</Th>
          <Th>Assets Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {balanceSheetData.map((entry) => (
          <Tr key={entry.id}>
            <Td>{entry.year}</Td>
            <Td>{entry.month}</Td>
            <Td>{entry.profit_or_loss}</Td>
            <Td>{entry.assets_value}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BalanceSheetForm;
