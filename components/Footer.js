import {
  Box,
  chakra,
  Container,
  Image,
  Link,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Logo = (props) => {
  return <Image src="android-chrome-192x192.png" width={50} />;
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={"blackAlpha.100"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "blackAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    // needs to be at the bottom of the page
    <Box>
    </Box>
  );
}
