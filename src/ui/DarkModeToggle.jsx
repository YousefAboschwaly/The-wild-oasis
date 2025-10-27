import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const {isDarkMode,toggleDarkMode} = useDarkMode()
  console.log(isDarkMode)
  return (
    <ButtonIcon onClick={toggleDarkMode}>
     {isDarkMode? <HiOutlineMoon/> :<HiOutlineSun/>}
    </ButtonIcon>
  )
}
