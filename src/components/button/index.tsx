import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IButtonProps {
  title: string;
  redirect?: string;
}

export function ButtonCustom({ title, redirect }: IButtonProps) {
  const navigate = useNavigate();

  const buttonStyle = {
    bg: "transparent",
    w: "10rem",
    mr: "1rem",
    _hover: { bg: "#1B1B1B" },
    _active: { bg: "#1B1B1B" },
  };

  return (
    <Button sx={buttonStyle} onClick={() => navigate(`/${redirect}`)}>
      <Text color={"#fff"} bg={"transparent"} >{title}</Text>
    </Button>
  );
}
