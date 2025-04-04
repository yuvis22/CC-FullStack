import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SecurityIcon from "@mui/icons-material/Security";

interface ResultsDialogProps {
  open: boolean;
  onClose: () => void;
  result: {
    prediction: number;
    probability: number[];
  } | null;
  formData: any;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),
    maxWidth: "600px",
    width: "100%",
  },
}));

const StatusAlert = styled(Alert)<{ fraudulent: boolean }>(
  ({ theme, fraudulent }) => ({
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2, 3),
    "& .MuiAlertTitle-root": {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(1),
    },
  })
);

const DetailRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const ResultsDialog: React.FC<ResultsDialogProps> = ({
  open,
  onClose,
  result,
  formData,
}) => {
  if (!result) return null;

  const isFraudulent = result.prediction === 1;
  const confidenceScore = Math.max(...result.probability) * 100;

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ textAlign: "center", pb: 3 }}>
        <SecurityIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
        <Typography variant="h4" component="div">
          Transaction Analysis Results
        </Typography>
      </DialogTitle>
      <DialogContent>
        <StatusAlert
          severity={isFraudulent ? "error" : "success"}
          fraudulent={isFraudulent}
          icon={
            isFraudulent ? (
              <ErrorIcon fontSize="large" />
            ) : (
              <CheckCircleIcon fontSize="large" />
            )
          }
        >
          <AlertTitle>
            {isFraudulent ? "FRAUDULENT TRANSACTION" : "LEGITIMATE TRANSACTION"}
          </AlertTitle>
          <Typography variant="h6">
            {isFraudulent
              ? "This transaction has been flagged as potentially fraudulent."
              : "This transaction appears to be legitimate."}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Confidence Score: {confidenceScore.toFixed(2)}%
          </Typography>
        </StatusAlert>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Transaction Details:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <DetailRow>
            <Typography variant="subtitle1" color="text.secondary">
              Amount
            </Typography>
            <Typography variant="body1" fontWeight="500">
              ${formData.amount}
            </Typography>
          </DetailRow>
          <DetailRow>
            <Typography variant="subtitle1" color="text.secondary">
              Transaction Type
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {formData.transaction_type}
            </Typography>
          </DetailRow>
          <DetailRow>
            <Typography variant="subtitle1" color="text.secondary">
              Merchant Category
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {formData.merchant_category}
            </Typography>
          </DetailRow>
          <DetailRow>
            <Typography variant="subtitle1" color="text.secondary">
              Card Type
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {formData.card_type}
            </Typography>
          </DetailRow>
          <DetailRow>
            <Typography variant="subtitle1" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {formData.transaction_location}
            </Typography>
          </DetailRow>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ResultsDialog;
