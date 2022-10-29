import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";

export function Home() {
  const navigate = useNavigate()
  return (
    <Flex bg={"gray.300"} w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <Box
        p={2}
        alignItems={"center"}
        bg={"blue.400"}
        h={"30rem"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-around"}
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
          recusandae sint. Fugit doloremque inventore nemo harum nam totam est
          provident fuga, at cumque modi labore animi nostrum a nihil repellat.
        </Text>
        <Flex w={'50%'} justifyContent={"space-around"}>
          <Button onClick={()=> navigate("/search")}>Buscar por Cep</Button>
          <Button>Buscar por endereço</Button>
        </Flex>
      </Box>
    </Flex>
  );
}
