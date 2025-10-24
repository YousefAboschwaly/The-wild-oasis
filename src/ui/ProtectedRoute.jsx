import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1- Load the authenticated user
  const { isAuthenticated, isPending , user } = useUser();

  // 2- if there is NO authenticated user , redirect to /login
console.log(user)
  useEffect(() => {
    if (!isAuthenticated && !isPending){
      console.log("NOT AUTHENTiCATED")
      navigate("/login",{replace:true})};
  }, [isAuthenticated, isPending, navigate]);

  // 3- showing Spinner when loading data
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4- if the user is authenticated
  if (isAuthenticated ){
    console.log(isAuthenticated)
    return children;}
  return null
}
