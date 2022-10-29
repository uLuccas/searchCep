import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Header } from "../../components/header";

interface Idata {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Idata>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleSearch() {
    const client = axios.create({
      baseURL: "https://viacep.com.br/ws/",
    });

    const response = await client.get(`08253010/json`);
    console.log(response.data);
    setData(response.data);
    onOpen();
  }

  return (
    <Flex bg={"gray.300"} w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <Box
        alignItems={"center"}
        display={"flex"}
        flexDir={"column"}
        p={2}
        justifyContent={"space-around"}
        h={"50%"}
      >
        <Text fontWeight={"bold"} fontSize={"2xl"} mb={5}>
          Buscar endereço por Cep
        </Text>
        <FormControl w={"80%"} flexDir={"column"} display={"flex"}>
          <FormLabel>CEP</FormLabel>
          <Input
            type="text"
            w={"10rem"}
            maxLength={8}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Flex>
            {search && <Button type="reset">limpar</Button>}
            <Button type="submit" onClick={handleSearch}>
              Pesquisar
            </Button>
          </Flex>
        </FormControl>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados obtidos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Logradouro: {data?.logradouro}</Text>
            <Text>Bairro: {data?.bairro}</Text>
            <Text>Cep: {data?.cep}</Text>
            <Text>Localidade: {data?.localidade}</Text>
            <Text>UF: {data?.uf}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
