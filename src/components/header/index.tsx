import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate()

  return (
    <Flex  w={"100%"} h={"16"} alignItems={"center"} p={"2"}>
      <Button bg={"transparent"} w={"10rem"} mr={"1rem"} _hover={{bg: "black"}} onClick={()=> navigate("/")}>
        <Text>Home</Text>
      </Button>
      <Button bg={"transparent"} w={"10rem"} mr={"1rem"} onClick={()=> navigate("/search")}>
        <Text>Busca por Cep</Text>
      </Button>
      <Button bg={"transparent"} w={"10rem"} onClick={()=> navigate("/searchAddress")}>
        <Text>Busca por Endereço</Text>
      </Button>
    </Flex>
  );
}
