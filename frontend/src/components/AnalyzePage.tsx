import React, { useState, useRef } from "react";
import { Container, Box } from "@mui/material";
import TransactionForm from "./TransactionForm";
import ResultsDialog from "./ResultsDialog";

const AnalyzePage: React.FC = () => {
  const [result, setResult] = useState<{
    prediction: number;
    probability: number[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState(null);
  const formRef = useRef<{ resetForm: () => void }>();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setFormData(data);

    // Simulate API delay (3-5 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 2000 + 3000)
    );

    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          amount: parseFloat(data.amount),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setResult(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing the transaction. Please try again.");
      if (formRef.current) {
        formRef.current.resetForm();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setResult(null);
    setFormData(null);
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <TransactionForm
          ref={formRef}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <ResultsDialog
          open={showResults}
          onClose={handleCloseResults}
          result={result}
          formData={formData}
        />
      </Container>
    </Box>
  );
};

export default AnalyzePage;
