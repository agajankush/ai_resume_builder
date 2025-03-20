import { useState } from "react";
import "./App.css";
import UploadResume from "./components/UploadResume";
import EnhanceResume from "./components/EnhanceResume";
import { ToastContainer } from "react-toastify";

function App() {
  const [resumeId, setResumeId] = useState(null);
  return (
    <>
      <h1>AI Resume Enhancer</h1>
      <UploadResume setResumeId={setResumeId} />
      {resumeId && <EnhanceResume resumeId={resumeId} />}
      <ToastContainer />
    </>
  );
}

export default App;
