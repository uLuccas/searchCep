import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Header } from "../../components/header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonCustom, buttonStyle } from "../../components/button";

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

  async function handleSearch() {
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

  function cleanForm() {
    setSearch("");
  }

  return (
    <Flex color={"#f5f5f5"} w={"100%"} flexDir={"column"} h={"100vh"}>
      <Header />
      <ToastContainer />
      <Box
        alignItems={"flex-start"}
        display={"flex"}
        flexDir={"column"}
        p={10}
        justifyContent={"space-around"}
        h={"90%"}
      >
        <Flex
          w={"100%"}
          h={"80%"}
          pl={[10, 120]}
          flexDir={"column"}
          alignItems={"flex-start"}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Text fontWeight={"bold"} color="#ff7900" fontSize={"2xl"}>
            Buscar endereço por CEP
          </Text>
          <Flex flexDir={"column"} color="#f9f6f4" w={"75%"}>
            <FormLabel>Digite um CEP*</FormLabel>
            <Input
              type="text"
              placeholder="Ex: 01100100"
              _placeholder={{ color: '#ff7700be' }}
              _hover={{ borderColor: "#ff7900" }}
              borderColor={"#f9f6f4"}
              w={["100%", "70%"]}
              maxLength={8}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {!search.match(/^[0-9]{8}/) && search.length ? (
              <Text mt={2} fontSize={15} color={"#ff7700ce"}>
                *CEP invalido*
              </Text>
            ) : (
              ""
            )}
          </Flex>
          <Flex
            flexDir={["column-reverse", "row"]}
            justifyContent={"flex-start"}
            w={"75%"}
          >
            {search && (
              <Button
                type="reset"
                sx={{
                  ...buttonStyle,
                  w: ["100%", "34%"],
                  mb: 5,
                  bg: "#353535",
                }}
                onClick={() => cleanForm()}
              >
                Limpar
              </Button>
            )}
            <Button
              w={"100%"}
              sx={{
                ...buttonStyle,
                bg: "#ff7900",
                w: search ? ["100%", "34%"] : ["100%", "70%"],
              }}
              type="submit"
              disabled={!search.match(/^[0-9]{8}/)}
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
          </Flex>
          <ButtonCustom title={"Voltar"} redirect={""} />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"#f5f5f5"}>
          <ModalHeader color={"#ff7900"} fontWeight={"bold"} >Resultado da pesquisa</ModalHeader>
          <ModalCloseButton color={"#ff7900"} />
          <ModalBody>
            <Text mb={2} fontWeight={"medium"} fontSize={17}>Logradouro: {data?.logradouro}</Text>
            <Text mb={2} fontWeight={"medium"} fontSize={17}>Bairro: {data?.bairro}</Text>
            <Text mb={2} fontWeight={"medium"} fontSize={17}>CEP: {data?.cep}</Text>
            <Text mb={2} fontWeight={"medium"} fontSize={17}>Localidade: {data?.localidade}</Text>
            <Text mb={2} fontWeight={"medium"} fontSize={17}>UF: {data?.uf}</Text>
            {data?.complemento && (
              <Text mb={2} fontWeight={"medium"} fontSize={17}>Complemento: {data?.complemento}</Text>
            )}
            <Text mb={2} fontWeight={"medium"} fontSize={17}>IBGE: {data?.ibge}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
