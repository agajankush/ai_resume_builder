import { useState } from "react";
import "./App.css";
import UploadResume from "./components/UploadResume";
import EnhanceResume from "./components/EnhanceResume";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <h1>AI Resume Enhancer</h1>
      <UploadResume />
      <ToastContainer />
    </>
  );
}

export default App;
