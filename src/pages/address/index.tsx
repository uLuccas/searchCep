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
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Idata } from "../search";

//tipagem do retorno da query de GET
interface IDataState {
  id: number;
  nome: string;
  sigla: string;
  regiao: {
    id: number;
    nome: string;
    sigla: string;
  };
}

interface ISearchAddress {
  state?: string | undefined;
  county?: string | undefined;
  address?: string | undefined;
}

interface IDataCounty {
  id: number;
  nome: string;
}

export function SearchByAddress() {
  const [search, setSearch] = useState<ISearchAddress>();
  const [data, setData] = useState<Idata>();
  const [states, setStates] = useState<IDataState[]>([]);
  const [county, setCounty] = useState<IDataCounty[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  async function handleSearch(evt: any) {
    evt.preventDefault()
    try {
      const client = axios.create({
        baseURL: "https://viacep.com.br/ws",
      });
      const response = await client.get(`/${search?.state}/${search?.county}/${search?.address}/json/`);
      console.log(response);

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
        setData(response.data[0]);
        onOpen();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getStates() {
    try {
      const client = axios.create({
        baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
      });
      const response = await client.get(`/estados`);
      console.log(response);

      setStates(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function getCounty() {
    try {
      const client = axios.create({
        baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/",
      });
      const response = await client.get(`${search?.state}/municipios`);
      console.log(response);
      setCounty(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  function cleanForm() {
    setSearch({ address: "", county: "", state: "" });
    setCounty([]);
  }

  useEffect(() => {
    if (!states.length) {
      console.log("here");
      getStates();
    }
    if (search?.state && !search.county) {
      console.log("hera");
      getCounty();
    }
  }, [search]);

  useEffect(()=> {
    console.log(search)
  },[search])

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
        h={"90%"}
      >
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Buscar endereço por Endereço
        </Text>

        <form action="">
          <FormLabel>Estado</FormLabel>
          <Select
            placeholder="Selecione um estado"
            size={"md"}
            onChange={(e) =>
              setSearch((oldState) => ({ ...oldState, state: e.target.value }))
            }
          >
            {states &&
              states.map((item) => (
                <option key={item.id} value={item.sigla}>
                  {item.nome}
                </option>
              ))}
          </Select>

          <FormLabel mt={2}>Município</FormLabel>
          <Select
            placeholder="Selecione um municipio"
            size={"md"}
            disabled={!search?.state}
            onChange={(e) =>
              setSearch((oldState) => ({ ...oldState, county: e.target.value }))
            }
          >
            {county &&
              county.map((item) => (
                <option key={item.id} value={item.nome}>
                  {item.nome}
                </option>
              ))}
          </Select>

          <FormLabel mt={2}>Logradouro</FormLabel>
          <Input
            type="text"
            placeholder="Rua exemplo"
            w={"10rem"}
            disabled={!search?.county}
            onChange={(e) =>
              setSearch((oldState) => ({
                ...oldState,
                address: e.target.value,
              }))
            }
          />
          <br />
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Button mt={6} type="reset" onClick={()=> cleanForm()}>
              limpar
            </Button>

            <Button
              mt={6}
              type="submit"
              disabled={!search?.address}
              onClick={(e) => handleSearch(e)}
            >
              Pesquisar
            </Button>
          </Flex>
        </form>

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
