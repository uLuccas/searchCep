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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export interface Idata {
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

  const navigate = useNavigate();

  async function handleSearch(evt: any) {
    evt.preventDefault();
    try {
      const client = axios.create({
        baseURL: "https://viacep.com.br/ws/",
      });
      const response = await client.get(`${search}/json`);

      if (response.data?.erro) {
        toast.error("CEP não encontrado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setData(response.data);
        onOpen();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function cleanForm(){
    setSearch("")
  }

  return (
    <Flex bg={"gray.300"} w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <ToastContainer />
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
        {/* <Flex w={"80%"} flexDir={"column"} display={"flex"} > */}
        <form action="">
          <FormLabel>CEP</FormLabel>
          <Input
            type="text"
            w={"10rem"}
            maxLength={8}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Flex>
            {search && <Button type="reset" onClick={()=> cleanForm()}>limpar</Button>}
            <Button
              type="submit"
              disabled={!search.match(/^[0-9]{8}/)}
              onClick={(e) => handleSearch(e)}
            >
              Pesquisar
            </Button>
          </Flex>
        </form>
        {/* </Flex> */}
        <Button onClick={() => navigate("/")}>Voltar</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados obtidos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Logradouro: {data?.logradouro}</Text>
            <Text mb={2}>Bairro: {data?.bairro}</Text>
            <Text mb={2}>Cep: {data?.cep}</Text>
            <Text mb={2}>Localidade: {data?.localidade}</Text>
            <Text mb={2}>UF: {data?.uf}</Text>
            <Text mb={2}>Complemento: {data?.complemento}</Text>
            <Text mb={2}>IBGE: {data?.ibge}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
