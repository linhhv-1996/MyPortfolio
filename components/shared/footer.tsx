import {
  Stack,
  Link,
  Box,
  Text,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Stack
      as="footer"
      isInline
      spacing={[1, 2]}
      p={4}
      justifyContent="space-between"
      alignItems="center"
      w={["100%", "85%", "80%"]}
      maxW={800}
      mx="auto"
    >
      <Flex
        flexDirection={["column", "column", "row"]}
        flexFlow={["column-reverse", "column-reverse"]}
        justifyContent={["center", "space-between"]}
        alignItems="center"
        w="100%"
      >
        <Text
          textAlign="center"
          fontSize="sm"
          color={useColorModeValue("gray.500", "gray.200")}
        >
          © {new Date().getFullYear()} WordWhisperer.co{" "}
        </Text>

        <Box textAlign="center">
          <Stack direction={'row'} spacing={6}>
              <Link fontSize={"sm"} href={'/privacy'}>Privacy Policy</Link>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
};

export default Footer;
