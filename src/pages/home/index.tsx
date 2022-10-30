import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../../components/button";
import { Header } from "../../components/header";

export function Home() {

  return (
    <Flex w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <Box
        p={2}
        alignItems={"center"}
        color={"#fff"}
        h={"30rem"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-around"}
      >
        <Text fontWeight={"bold"} fontSize={"4xl"}>
          Bem vindo(a) ao Buscador de CEP
        </Text>
        <Text fontSize={"2xl"}>
          Aqui você pode procurar o CEP de qualquer região do país de maneira
          rapida e fácil. Vamos lá?
        </Text>
        <Flex w={"50%"} justifyContent={"space-around"}>
          <ButtonCustom title="Buscar por CEP" redirect="search" />
          <ButtonCustom title="Encontrar Cep" redirect="searchAddress" />
        </Flex>
      </Box>
    </Flex>
  );
}
