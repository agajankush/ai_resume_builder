import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const UploadResume = ({ setResumeId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      //Logic to upload the file to the fastapi backend
      const res = await api.post("/upload_resume", formData);
      setResumeId(res.data.resume_id);
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </>
  );
};

export default UploadResume;
