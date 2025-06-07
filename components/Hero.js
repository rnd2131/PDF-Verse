import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
  Hide,
} from "@chakra-ui/react";

export default function Hero({
  title,
  subtitle,
  subtitle2,
  image,
  ctaLink1,
  ctaLink2,
  ctaLink3,
  ctaLink4,
  ctaText1,
  ctaText2,
  ctaText3,
  ctaText4,
  ...rest
}) {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="60vh"
      px={8}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "95%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
        
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
        
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          display="flex"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
        
        </Heading>
        <Link href={ctaLink1}>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            {ctaText1}
          </Button>
        </Link>
        <Link href={ctaLink2}>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            {ctaText2}
          </Button>
        </Link>
        <Link href={ctaLink3}>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            {ctaText3}
          </Button>
        </Link>
        <Link href={ctaLink4}>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            {ctaText4}
          </Button>
        </Link>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Hide below="md">
        </Hide>
      </Box>
    </Flex>
  );
}
