import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const EnhanceResume = ({ resumeId }) => {
  const [loading, setLoading] = useState(null);
  const [enhancedText, setEnhancedText] = useState("");

  const enhanceResume = async () => {
    try {
      setLoading(true);
      await api.post(`/enhance/${resumeId}`);
      toast.success("Resume Enhancement Started!");

      setTimeout(async () => {
        const res = await api.get(`/resume/${resumeId}`);
        setEnhancedText(res.data.enhanced_text);
        toast.success("Resume enhanced successfully!");
      }, 5000);
    } catch (err) {
      toast.error("Enhancement failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button onClick={enhanceResume}>
        {loading ? "Enhancing..." : "Enhance Resume"}
      </button>
      {enhancedText && (
        <div>
          <h3>Enhanced resume:</h3>
          <pre>{enhancedText}</pre>
        </div>
      )}
    </>
  );
};

export default EnhanceResume;
