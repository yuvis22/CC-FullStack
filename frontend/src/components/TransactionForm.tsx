import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid as MuiGrid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  InputAdornment,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";

interface TransactionFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export interface TransactionFormRef {
  resetForm: () => void;
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

const Grid = MuiGrid as React.ComponentType<any>;

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(8, 4),
  background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
  color: "#fff",
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#fff",
  borderRadius: theme.shape.borderRadius,
  background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
}));

const TransactionForm = forwardRef<TransactionFormRef, TransactionFormProps>(
  ({ onSubmit, loading = false }, ref) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
      amount: "",
      transaction_type: "in-store",
      merchant_category: "retail",
      card_type: "credit",
      transaction_location: "domestic",
      customer_age: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        setActiveStep(0);
        setFormData({
          amount: "",
          transaction_type: "in-store",
          merchant_category: "retail",
          card_type: "credit",
          transaction_location: "domestic",
          customer_age: "",
        });
        setErrors({});
      },
    }));

    const steps = ["Transaction Details", "Analysis", "Results"];

    // Add effect to automatically move to next step when loading completes
    React.useEffect(() => {
      if (activeStep === 1 && !loading) {
        setActiveStep(2);
      }
    }, [loading, activeStep]);

    const handleNext = () => {
      if (validateForm()) {
        if (activeStep === 0) {
          setActiveStep(1);
          onSubmit(formData);
        }
      }
    };

    const handleBack = () => {
      setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        onSubmit(formData);
      }
    };

    const getStepContent = (step: number) => {
      switch (step) {
        case 0:
          return (
            <FormSection>
              <CardContent>
                <Box sx={{ maxWidth: "450px", margin: "0 auto", py: 2 }}>
                  {/* Form Content */}
                  <Box sx={{ mb: 5 }}>
                    <SectionHeader>
                      <PersonIcon
                        sx={{ color: "primary.main", fontSize: "1.5rem" }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "primary.main",
                        }}
                      >
                        Customer Information
                      </Typography>
                    </SectionHeader>
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <FormControl>
                        <InputLabel>Customer Age</InputLabel>
                        <OutlinedInput
                          label="Customer Age"
                          name="customer_age"
                          type="number"
                          value={formData.customer_age}
                          onChange={handleInputChange}
                          inputProps={{ min: "18", max: "120" }}
                          fullWidth
                          sx={{ borderRadius: 2 }}
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
                      <FormControl>
                        <InputLabel>Card Type</InputLabel>
                        <Select
                          name="card_type"
                          value={formData.card_type}
                          onChange={handleSelectChange}
                          label="Card Type"
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="credit">Credit Card</MenuItem>
                          <MenuItem value="debit">Debit Card</MenuItem>
                          <MenuItem value="prepaid">Prepaid Card</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 5 }}>
                    <SectionHeader>
                      <PaymentIcon
                        sx={{ color: "primary.main", fontSize: "1.5rem" }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "primary.main",
                        }}
                      >
                        Transaction Details
                      </Typography>
                    </SectionHeader>
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <FormControl>
                        <InputLabel>Transaction Amount</InputLabel>
                        <OutlinedInput
                          label="Transaction Amount"
                          name="amount"
                          type="number"
                          value={formData.amount}
                          onChange={handleInputChange}
                          error={!!errors.amount}
                          inputProps={{ min: "0", step: "0.01" }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          fullWidth
                          sx={{ borderRadius: 2 }}
                        />
                        {errors.amount && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 1 }}
                          >
                            {errors.amount}
                          </Typography>
                        )}
                      </FormControl>
                      <FormControl>
                        <InputLabel>Transaction Type</InputLabel>
                        <Select
                          name="transaction_type"
                          value={formData.transaction_type}
                          onChange={handleSelectChange}
                          label="Transaction Type"
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="in-store">In-Store</MenuItem>
                          <MenuItem value="online">Online</MenuItem>
                          <MenuItem value="atm">ATM</MenuItem>
                          <MenuItem value="international">
                            International
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <SectionHeader>
                      <ShoppingCartIcon
                        sx={{ color: "primary.main", fontSize: "1.5rem" }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "primary.main",
                        }}
                      >
                        Merchant Information
                      </Typography>
                    </SectionHeader>
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <FormControl>
                        <InputLabel>Merchant Category</InputLabel>
                        <Select
                          name="merchant_category"
                          value={formData.merchant_category}
                          onChange={handleSelectChange}
                          label="Merchant Category"
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="retail">Retail</MenuItem>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="food">Food & Dining</MenuItem>
                          <MenuItem value="travel">Travel</MenuItem>
                          <MenuItem value="entertainment">
                            Entertainment
                          </MenuItem>
                          <MenuItem value="healthcare">Healthcare</MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Transaction Location</InputLabel>
                        <Select
                          name="transaction_location"
                          value={formData.transaction_location}
                          onChange={handleSelectChange}
                          label="Transaction Location"
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="domestic">Domestic</MenuItem>
                          <MenuItem value="international">
                            International
                          </MenuItem>
                          <MenuItem value="online">Online</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </FormSection>
          );
        case 1:
          return (
            <FormSection>
              <CardContent>
                <SectionHeader>
                  <AssessmentIcon fontSize="large" />
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Analysis in Progress
                  </Typography>
                </SectionHeader>
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Analyzing transaction patterns...
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Our AI is processing your transaction details
                  </Typography>
                </Box>
              </CardContent>
            </FormSection>
          );
        case 2:
          return (
            <FormSection>
              <CardContent>
                <SectionHeader>
                  <CheckCircleIcon fontSize="large" />
                  <Typography variant="h6" color="primary" fontWeight="600">
                    Review & Submit
                  </Typography>
                </SectionHeader>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                      Please review your transaction details before submitting:
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography>
                        <strong>Customer Age:</strong> {formData.customer_age}
                      </Typography>
                      <Typography>
                        <strong>Amount:</strong> ${formData.amount}
                      </Typography>
                      <Typography>
                        <strong>Transaction Type:</strong>{" "}
                        {formData.transaction_type}
                      </Typography>
                      <Typography>
                        <strong>Merchant Category:</strong>{" "}
                        {formData.merchant_category}
                      </Typography>
                      <Typography>
                        <strong>Card Type:</strong> {formData.card_type}
                      </Typography>
                      <Typography>
                        <strong>Location:</strong>{" "}
                        {formData.transaction_location}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </FormSection>
          );
        default:
          return "Unknown step";
      }
    };

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      // Validate amount
      if (!formData.amount) {
        newErrors.amount = "Amount is required";
      } else if (
        isNaN(Number(formData.amount)) ||
        Number(formData.amount) <= 0
      ) {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Transaction Analysis
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          {getStepContent(activeStep)}

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Back
            </Button>
            {activeStep === 0 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  background:
                    "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1 }}
                      color="inherit"
                    />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Transaction"
                )}
              </Button>
            )}
          </Box>
        </form>
      </StyledPaper>
    );
  }
);

export default TransactionForm;
