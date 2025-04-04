import { useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Paper,
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
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
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
      // Only convert amount to number, keep other fields as strings
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

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
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Hero Section */}
        

        {/* Main Content */}
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
            }}
          >
            <TransactionForm onSubmit={handleSubmit} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
            }}
          >
            <Results
              prediction={prediction}
              loading={loading}
              probability={probability || undefined}
            />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
