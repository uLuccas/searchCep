import { Flex } from "@chakra-ui/react";
import { ButtonCustom } from "../button";

export function Header() {
  return (
    <Flex
      w={"100%"}
      h={"16"}
      alignItems={"center"}
      justifyContent={"center"}
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
