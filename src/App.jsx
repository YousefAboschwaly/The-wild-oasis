import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"

export default function App() {

const H1= styled.h1`
  font-size: 40px;
  color: blue;
  font-weight: bold;
`

  return (
    <>
    <GlobalStyles/>
     <H1> Hello React  </H1>
      </>
  )
}
