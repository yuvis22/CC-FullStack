import React from "react";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

interface ResultsProps {
  prediction: number | null;
  loading: boolean;
  probability?: number[];
}

const Results: React.FC<ResultsProps> = ({
  prediction,
  loading,
  probability,
}) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (prediction === null) {
    return null;
  }

  const isFraudulent = prediction === 1;
  const backgroundColor = isFraudulent ? "#ffebee" : "#e8f5e9";
  const textColor = isFraudulent ? "#c62828" : "#2e7d32";
  const confidenceScore = probability
    ? Math.round(probability[prediction] * 100)
    : null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        backgroundColor,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom color={textColor}>
        {isFraudulent
          ? "⚠️ Fraudulent Transaction Detected!"
          : "✅ Legitimate Transaction"}
      </Typography>
      <Typography variant="body1" color={textColor} gutterBottom>
        {isFraudulent
          ? "This transaction has been flagged as potentially fraudulent."
          : "This transaction appears to be legitimate."}
      </Typography>

      {confidenceScore !== null && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color={textColor} gutterBottom>
            Confidence Score: {confidenceScore}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={confidenceScore}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isFraudulent ? "#ffcdd2" : "#c8e6c9",
              "& .MuiLinearProgress-bar": {
                backgroundColor: isFraudulent ? "#d32f2f" : "#388e3c",
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Results;
