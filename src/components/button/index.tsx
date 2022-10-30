import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IButtonProps {
  title: string;
  redirect?: string;
  style?: any
}

export const buttonStyle = {
  bg: "transparent",
  w: "10rem",
  mr: "1rem",
  _hover: { bg: "#1B1B1B" },
  _active: { bg: "#1B1B1B" },
};

export function ButtonCustom({ title, redirect , style}: IButtonProps) {
  const navigate = useNavigate();
  
  return (
    <Button sx={ style ? style : buttonStyle} onClick={() => navigate(`/${redirect}`)}>
      <Text color={"#fff"} bg={"transparent"} >{title}</Text>
    </Button>
  );
}
