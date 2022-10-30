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
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Idata } from "../search";
import { ButtonCustom, buttonStyle } from "../../components/button";

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
  const [search, setSearch] = useState<ISearchAddress>({address:"",county:"",state:""});
  const [data, setData] = useState<Idata[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [states, setStates] = useState<IDataState[]>([]);
  const [county, setCounty] = useState<IDataCounty[]>();

  const regValidation = /^[\w'\-,.][^0-9_!¡?÷?¿\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

  async function handleSearch() {
    try {
      const client = axios.create({
        baseURL: "https://viacep.com.br/ws",
      });
      const response = await client.get(
        `/${search?.state}/${search?.county}/${search?.address}/json/`
      );
      console.log(response.data);

      if (response.data?.erro || !response.data.length || !response.data[0].logradouro) {
        toast.error("Endereço não localizado!", {
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
        setIsOpen(true);
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
      const response = await client.get(`/estados?orderBy=nome`);
      if (response.data?.erro) {
        toast.error("Estados não localizados", {
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
        setStates(response.data);
      }
    } catch (e) {
      console.log(e);
      toast.warn("Erro interno de servidor :/", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  async function getCounty() {
    try {
      const client = axios.create({
        baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/",
      });
      const response = await client.get(`${search?.state}/municipios`);
      setCounty(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  function cleanForm() {
    setSearch({ address: "", county: "", state: "" });
    setCounty([]);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (!states.length) getStates();
    if (search?.state && !search.county) getCounty();
  }, [search, states]);

  return (
    <Flex w={"100%"} color={"#fff"} flexDir={"column"} h={"100vh"}>
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
            Encontre seu CEP
          </Text>
          <Text
            fontWeight={"medium"}
            color="#f5f5f5"
            fontSize={"inherit"}
            mb={5}
          >
            Por favor, selecione um estado, município e nos informe um
            logradouro para que possamos encontrar seu CEP.
          </Text>

          <Flex flexDir={"column"} color="#f9f6f4" w={"75%"}>
            <FormLabel>Estado</FormLabel>
            <Select
              w={["100%", "70%"]}
              placeholder="Selecione um estado"
              _hover={{ borderColor: "#ff7900" }}
              size={"md"}
              onChange={(e) => {
                setSearch((oldState) => ({
                  ...oldState,
                  state: e.target.value,
                }));
                setCounty([])
              }}
            >
              {states &&
                states.map((item) => (
                  <option
                    style={{ color: "#353535" }}
                    key={item.id}
                    value={item.sigla}
                  >
                    {item.nome}
                  </option>
                ))}
            </Select>

            <FormLabel mt={2}>Município</FormLabel>
            <Select
              placeholder="Selecione um municipio"
              size={"md"}
              _hover={{ borderColor: "#ff7900" }}
              w={["100%", "70%"]}
              disabled={!search?.state}
              onChange={(e) =>
                setSearch((oldState) => ({
                  ...oldState,
                  county: e.target.value,
                }))
              }
            >
              {county &&
                county.map((item) => (
                  <option
                    key={item.id}
                    style={{ color: "#353535" }}
                    value={item.nome}
                  >
                    {item.nome}
                  </option>
                ))}
            </Select>

            <FormLabel mt={2}>Logradouro</FormLabel>
            <Input
              type="text"
              placeholder="Rua Exemplo"
              _hover={{ borderColor: "#ff7900" }}
              borderColor={"#f9f6f4"}
              w={["100%", "70%"]}
              disabled={!search?.county}
              value={search?.address}
              onChange={(e) =>
                setSearch((oldState) => ({
                  ...oldState,
                  address: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex
            flexDir={["column-reverse", "row"]}
            justifyContent={"flex-start"}
            w={"75%"}
          >
            <Button
              mt={6}
              sx={{
                ...buttonStyle,
                w: ["100%", "34%"],
                mb: 5,
                bg: "#353535",
              }}
              type="reset"
              onClick={() => cleanForm()}
            >
              limpar
            </Button>

            <Button
              mt={6}
              sx={{
                ...buttonStyle,
                bg: "#ff7900",
                mr: "none",
                w: ["100%", "34%"],
              }}
              type="submit"
              disabled={search?.address?.match(regValidation) ? false : true}
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
          </Flex>
          <ButtonCustom title={"Voltar"} redirect={""} />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent color={"#f5f5f5"} minW={[400, 500, 700]} h={500}>
          <ModalHeader color={"#ff7900"} fontWeight={"bold"}>
            Resultado da pesquisa
          </ModalHeader>
          <ModalCloseButton color={"#ff7900"} />
          <ModalBody>
            <TableContainer
              overflowY={"scroll"}
              height={["260px", "400px"]}
              minW={["none", 400, "auto"]}
              style={{
                WebkitScrollSnapType: "none",
              }}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color={"#ff7900"}>Logradouro</Th>
                    <Th color={"#ff7900"}>CEP</Th>
                    <Th color={"#ff7900"}>Bairro</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data &&
                    data.map((item, idx) => (
                      <Tr key={idx}>
                        <Td>{item.logradouro}</Td>
                        <Td>{item.cep}</Td>
                        <Td>{item.bairro}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
