import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";

import { HashRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Routes />
        <GlobalStyle />
      </DndProvider>
    </HashRouter>
  );
}
//GlobalStyle - cor do fundo
// não é possivel colocar o Header e Global sem ter um component para englobar os dois. por isso utilizado o <>
// <> = fragment do React é basicamente uma div que não aparece no html

export default App;
