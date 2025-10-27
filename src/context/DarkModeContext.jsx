/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
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

 function useDarkMode(){
  const context = useContext(DarkModeContext)
  if(context===undefined) throw new Error("DarkModeContext was used outside of provider ")
    return context
}

export{DarkModeProvider,useDarkMode}