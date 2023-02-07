import PlanetsList from "./components/PlanetsList";
import Header from "./components/Header";
import PlanetForm from "./components/PlanetForm";
import { useState } from "react";
import "./App.css";

import data from "./data/planets";

function App() {
  const [planets, setPlanets] = useState([...data.planets]);

  // Refreshing child components: Declare the state in parent <App /> and share it with siblings.
  // https://learntechatyourpace.blogspot.com/2022/12/react-how-to-refresh-sibling-components.html

  return (
    <>
      <Header />
      <PlanetsList planets={planets} setPlanets={setPlanets} />
      <PlanetForm planets={planets} setPlanets={setPlanets} />
    </>
  );
}

export default App;
