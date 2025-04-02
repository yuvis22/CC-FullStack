import { useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TransactionForm from "./components/TransactionForm";
import Results from "./components/Results";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [probability, setProbability] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      // Convert string values to numbers
      const data = Object.entries(formData).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: parseFloat(value as string),
        }),
        {}
      );

      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setPrediction(result.prediction);
      setProbability(result.probability);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing the transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <TransactionForm onSubmit={handleSubmit} />
        <Results
          prediction={prediction}
          loading={loading}
          probability={probability || undefined}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
