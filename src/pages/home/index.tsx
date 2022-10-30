import { Flex, Text, Box } from "@chakra-ui/react";
import { ButtonCustom, buttonStyle } from "../../components/button";
import { Header } from "../../components/header";

export function Home() {
  return (
    <Flex w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <Box
        p={3}
        alignItems={"center"}
        color={"#fff"}
        minH={"30rem"}
        h={"auto"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-around"}
      >
        <Text fontWeight={"bold"} fontSize={"4xl"} color="#ff7900">
          Bem vindo(a) ao Buscador de CEP
        </Text>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Text fontSize={"2xl"}>
            Aqui você pode procurar o CEP de qualquer região do país de maneira
            rapida e fácil.
          </Text>
          <Text fontSize={"2xl"} color="#ff7900">
            Vamos lá?
          </Text>
        </Flex>
        <Flex
          flexDir={["column", "row"]}
          justifyContent={"center"}
          alignItems={"center"}
          w={"50%"}
        >
          <ButtonCustom
            style={{
              ...buttonStyle,
              bg: "#ff7900",
              mb: [5, 0],
              mr: ["0px", 5],
            }}
            title="Buscar por CEP"
            redirect="search"
          />
          <ButtonCustom
            style={{ ...buttonStyle, bg: "#ff7900", mr: "0px" }}
            title="Encontrar CEP"
            redirect="searchAddress"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
