import React from "react";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
  Fade,
  Zoom,
  Card,
  CardContent,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import TimelineIcon from "@mui/icons-material/Timeline";
import SpeedIcon from "@mui/icons-material/Speed";
import { alpha } from "@mui/material/styles";

interface ResultsProps {
  prediction: number | null;
  loading: boolean;
  probability?: number[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(4),
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 2,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #1976d2, #2196f3, #64b5f6)",
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  gap: theme.spacing(3),
}));

const ResultIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const ConfidenceBar = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  marginTop: theme.spacing(1),
  "& .MuiLinearProgress-bar": {
    transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
}));

const Results: React.FC<ResultsProps> = ({
  prediction,
  loading,
  probability,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Fade in={loading}>
        <LoadingContainer>
          <CircularProgress size={80} thickness={4} color="primary" />
          <Typography variant="h5" color="primary" fontWeight="600">
            Analyzing Transaction...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our AI model is processing your transaction data
          </Typography>
        </LoadingContainer>
      </Fade>
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
    <Zoom in={true}>
      <StyledPaper
        elevation={3}
        sx={{
          backgroundColor,
          border: `2px solid ${textColor}`,
        }}
      >
        <ResultIcon
          sx={{
            backgroundColor: isFraudulent
              ? alpha(theme.palette.error.main, 0.1)
              : alpha(theme.palette.success.main, 0.1),
          }}
        >
          {isFraudulent ? (
            <WarningIcon sx={{ fontSize: 50, color: textColor }} />
          ) : (
            <CheckCircleIcon sx={{ fontSize: 50, color: textColor }} />
          )}
        </ResultIcon>

        <Typography
          variant="h4"
          gutterBottom
          color={textColor}
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {isFraudulent
            ? "⚠️ Fraudulent Transaction Detected!"
            : "✅ Legitimate Transaction"}
        </Typography>

        <Chip
          icon={isFraudulent ? <SecurityIcon /> : <TimelineIcon />}
          label={isFraudulent ? "High Risk" : "Low Risk"}
          color={isFraudulent ? "error" : "success"}
          sx={{ mb: 2 }}
        />

        <Typography
          variant="body1"
          color={textColor}
          gutterBottom
          sx={{
            mb: 3,
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          {isFraudulent
            ? "This transaction has been flagged as potentially fraudulent. Please review the details carefully and consider blocking this transaction."
            : "This transaction appears to be legitimate and follows normal patterns. No action is required."}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {confidenceScore !== null && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <SpeedIcon sx={{ mr: 1, color: textColor }} />
              <Typography variant="h6" color={textColor} fontWeight="600">
                Confidence Score: {confidenceScore}%
              </Typography>
            </Box>
            <ConfidenceBar
              variant="determinate"
              value={confidenceScore}
              sx={{
                backgroundColor: isFraudulent ? "#ffcdd2" : "#c8e6c9",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: textColor,
                },
              }}
            />
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {isFraudulent
              ? "Our AI model has detected unusual patterns in this transaction."
              : "Our AI model has verified this transaction against known patterns."}
          </Typography>
        </Box>
      </StyledPaper>
    </Zoom>
  );
};

export default Results;
