import React from "react";
import styled from "@emotion/styled";
import SongsList from "./SongsList";
import SongForm from "./SongForm";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const App = () => {
  return (
    <AppContainer>
      <Header>Song Management</Header>
      <SongForm />
      <SongsList />
    </AppContainer>
  );
};

export default App;
