import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()


function DarkModeProvider({children}){
const [isDarkMode,setIsDarkMode] = useLocalStorageState(false,"isDarkMode")
function toggleDarkMode(){
  setIsDarkMode(dark=>!dark)
}

  return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
  </DarkModeContext.Provider>
}

