import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Row from "./ui/Row";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function App() {
  const StyledApp = styled.main`
    /* background-color: orangered; */
    padding: 20px;
    margin-top: 40px;
  `;

  const H1 = styled.h1`
    font-size: 40px;
    color: blue;
    font-weight: bold;
  `;

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The World Oasis</Heading>

            <div>
              <Heading as="h2">Check in Check out</Heading>
              <Button onClick={() => alert("Checked In")}>Check in</Button>
              <Button onClick={() => alert("Checked Out")}>Check Out</Button>
            </div>
          </Row>
          <Heading as="h3">Form</Heading>
          <Row type="vertical">
            <form>
              <Input type="number" placeholder="number of guests" />
              <Input type="number" placeholder="number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
