import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TransactionFormProps {
  onSubmit: (data: any) => void;
}

type FormData = {
  amount: string;
  transaction_type: string;
  merchant_category: string;
  card_type: string;
  transaction_location: string;
  customer_age: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
  marginTop: theme.spacing(4),
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: "all 0.3s ease",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  transition: "all 0.3s ease",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 14px rgba(33, 150, 243, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(33, 150, 243, 0.4)",
  },
}));

const FormSection = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  "& svg": {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    transaction_type: "in-store",
    merchant_category: "retail",
    card_type: "credit",
    transaction_location: "domestic",
    customer_age: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate amount
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    // Validate customer age
    if (!formData.customer_age) {
      newErrors.customer_age = "Age is required";
    } else {
      const age = Number(formData.customer_age);
      if (isNaN(age)) {
        newErrors.customer_age = "Age must be a number";
      } else if (age < 18) {
        newErrors.customer_age = "Age must be at least 18";
      } else if (age > 120) {
        newErrors.customer_age = "Age must be less than 120";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: "linear-gradient(45deg, #1976d2, #2196f3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Credit Card Transaction Analysis
      </Typography>

      <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Transaction Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Analysis</StepLabel>
        </Step>
        <Step>
          <StepLabel>Results</StepLabel>
        </Step>
      </Stepper>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <CardContent>
            <SectionHeader>
              <PersonIcon fontSize="large" />
              <Typography variant="h6" color="primary" fontWeight="600">
                Customer Information
              </Typography>
            </SectionHeader>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "13rem",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    mb: 3,
                  }}
                >
                  <FormControl
                    fullWidth
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        width: "100%",
                        minHeight: "56px",
                      },
                    }}
                    error={!!errors.customer_age}
                  >
                    <InputLabel>Customer Age</InputLabel>
                    <OutlinedInput
                      label="Customer Age"
                      name="customer_age"
                      type="number"
                      value={formData.customer_age}
                      onChange={handleChange}
                      inputProps={{ min: "18", max: "120" }}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-input": {
                          fontSize: "1.1rem",
                          padding: "16px 14px",
                        },
                      }}
                    />
                    {errors.customer_age && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1 }}
                      >
                        {errors.customer_age}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </FormSection>

        <FormSection>
          <CardContent>
            <SectionHeader>
              <PaymentIcon fontSize="large" />
              <Typography variant="h6" color="primary" fontWeight="600">
                Transaction Details
              </Typography>
            </SectionHeader>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Transaction Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  error={!!errors.amount}
                  helperText={errors.amount}
                  inputProps={{ min: "0", step: "0.01" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Type</InputLabel>
                  <StyledSelect
                    name="transaction_type"
                    value={formData.transaction_type}
                    onChange={handleChange}
                    label="Transaction Type"
                  >
                    <MenuItem value="in-store">In-Store</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="atm">ATM</MenuItem>
                    <MenuItem value="international">International</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </FormSection>

        <FormSection>
          <CardContent>
            <SectionHeader>
              <CreditCardIcon fontSize="large" />
              <Typography variant="h6" color="primary" fontWeight="600">
                Card Information
              </Typography>
            </SectionHeader>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Card Type</InputLabel>
                  <StyledSelect
                    name="card_type"
                    value={formData.card_type}
                    onChange={handleChange}
                    label="Card Type"
                  >
                    <MenuItem value="credit">Credit Card</MenuItem>
                    <MenuItem value="debit">Debit Card</MenuItem>
                    <MenuItem value="prepaid">Prepaid Card</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </FormSection>

        <FormSection>
          <CardContent>
            <SectionHeader>
              <ShoppingCartIcon fontSize="large" />
              <Typography variant="h6" color="primary" fontWeight="600">
                Merchant Information
              </Typography>
            </SectionHeader>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Merchant Category</InputLabel>
                  <StyledSelect
                    name="merchant_category"
                    value={formData.merchant_category}
                    onChange={handleChange}
                    label="Merchant Category"
                  >
                    <MenuItem value="retail">Retail</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="food">Food & Dining</MenuItem>
                    <MenuItem value="travel">Travel</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Location</InputLabel>
                  <StyledSelect
                    name="transaction_location"
                    value={formData.transaction_location}
                    onChange={handleChange}
                    label="Transaction Location"
                  >
                    <MenuItem value="domestic">Domestic</MenuItem>
                    <MenuItem value="international">International</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </FormSection>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon />}
            sx={{
              background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
            }}
          >
            Analyze Transaction
          </StyledButton>
        </Box>
      </form>
    </StyledPaper>
  );
};

export default TransactionForm;
