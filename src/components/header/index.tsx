import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../button";

export function Header() {
  const navigate = useNavigate();
  const buttonStyle = {
    bg: "transparent",
    w: "10rem",
    mr: "1rem",
    _hover: { bg: "#1B1B1B" },
    _active: { bg: "#1B1B1B" },
  };
  return (
    <Flex
      w={"100%"}
      h={"16"}
      alignItems={"center"}
      p={"2"}
      boxShadow={"md"}
      bg={"#242424"}
    >
      <ButtonCustom title="Home" redirect="" />
      <ButtonCustom title="Busca por Cep" redirect="search" />
      <ButtonCustom title="Encontrar Cep" redirect="searchAddress" />
    </Flex>
  );
}
