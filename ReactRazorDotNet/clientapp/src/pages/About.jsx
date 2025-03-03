import { useState } from "react";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";

import Button from "../components/common/Button";

function About() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  return (
    <>
      <h1>About</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button onClick={() => navigate("/")} text={"Home"} />
    </>
  );
}

export default About;
