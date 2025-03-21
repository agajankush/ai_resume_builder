import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { jsPDF } from "jspdf";
import { Document, Page, pdfjs } from "react-pdf";
import "../assets/layout.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const EnhanceResume = ({ resumeId, uploadedFile }) => {
  const [loading, setLoading] = useState(null);
  const [enhancedText, setEnhancedText] = useState("");
  const [generatedPDF, setGeneratedPDF] = useState(null);

  const enhanceResume = async () => {
    try {
      setLoading(true);
      await api.post(`/enhance/${resumeId}`);
      toast.success("Resume Enhancement Started!");

      setTimeout(async () => {
        const res = await api.get(`/resume/${resumeId}`);
        setEnhancedText(res.data.enhanced_text);
        toast.success("Resume enhanced successfully!");
        generatePDF(enhancedText);
      }, 5000);
    } catch (err) {
      toast.error("Enhancement failed!");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (text) => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.text("AI-Enhanced Resume", 10, 10);

    let y = 20;
    const lines = doc.splitTextToSize(text, 180);
    lines.forEach((line) => {
      if (y > 280) {
        doc.addpage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += 7;
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setGeneratedPDF(pdfUrl);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          onClick={enhanceResume}
          disabled={loading}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Enhancing..." : "Enhance Resume"}
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Uploaded Resume (Left) */}
          <div className="border p-4">
            <h3 className="text-center text-lg font-bold">Uploaded Resume</h3>
            {uploadedFile ? (
              <Document file={uploadedFile}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <p>No Uploaded File</p>
            )}
          </div>

          {/* AI-Generated Resume (Right) */}
          <div className="border p-4">
            <h3 className="text-center text-lg font-bold">
              AI-Enhanced Resume
            </h3>
            {generatedPDF ? (
              <Document file={generatedPDF}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <p>No enhanced resume generated</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhanceResume;
