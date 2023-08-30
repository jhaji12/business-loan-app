import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
} from "@chakra-ui/react";

const AccountingProvider = ({ providers, onSelectProvider }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    onSelectProvider(provider);
  };

  return (
    <Center>
      <Box className="accounting-provider-dropdown" mt={5}>
        <Menu>
          <MenuButton as={Button}>
            {selectedProvider
              ? selectedProvider.name
              : "Select Accounting Provider"}
          </MenuButton>
          <MenuList>
            {providers.map((provider) => (
              <MenuItem
                key={provider.id}
                onClick={() => handleProviderSelect(provider)}
              >
                {provider.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Center>
  );
};

export default AccountingProvider;
