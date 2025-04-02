import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid as MuiGrid,
  ButtonGroup,
} from "@mui/material";

interface TransactionFormProps {
  onSubmit: (data: any) => void;
}

type FormData = {
  [key: string]: string;
  amount: string;
  time: string;
  v1: string;
  v2: string;
  v3: string;
  v4: string;
  v5: string;
  v6: string;
  v7: string;
  v8: string;
  v9: string;
  v10: string;
  v11: string;
  v12: string;
  v13: string;
  v14: string;
  v15: string;
  v16: string;
  v17: string;
  v18: string;
  v19: string;
  v20: string;
  v21: string;
  v22: string;
  v23: string;
  v24: string;
  v25: string;
  v26: string;
  v27: string;
  v28: string;
};

// Sample test cases
const testCases = {
  legitimate1: {
    amount: 149.62,
    time: 0,
    v1: -1.359807,
    v2: -0.072781,
    v3: 2.536347,
    v4: 1.378155,
    v5: -0.338321,
    v6: 0.462388,
    v7: 0.239599,
    v8: 0.098698,
    v9: 0.363787,
    v10: 0.090794,
    v11: -0.018307,
    v12: 0.277838,
    v13: -0.110474,
    v14: 0.066928,
    v15: 0.128539,
    v16: -0.189115,
    v17: 0.133558,
    v18: -0.021053,
    v19: 0.403993,
    v20: 0.251412,
    v21: -0.018307,
    v22: 0.277838,
    v23: -0.110474,
    v24: 0.066928,
    v25: 0.128539,
    v26: -0.189115,
    v27: 0.133558,
    v28: -0.021053,
  },
  legitimate2: {
    amount: 2.69,
    time: 0,
    v1: 1.191857,
    v2: 0.266151,
    v3: 0.16648,
    v4: 0.448154,
    v5: 0.060018,
    v6: -0.082361,
    v7: -0.078803,
    v8: 0.085102,
    v9: -0.255425,
    v10: -0.166974,
    v11: -0.225775,
    v12: -0.638672,
    v13: 0.101288,
    v14: -0.339846,
    v15: 0.16717,
    v16: 0.125895,
    v17: -0.008983,
    v18: 0.014724,
    v19: -0.225775,
    v20: -0.638672,
    v21: 0.101288,
    v22: -0.339846,
    v23: 0.16717,
    v24: 0.125895,
    v25: -0.008983,
    v26: 0.014724,
    v27: -0.008983,
    v28: 0.014724,
  },
  fraudulent1: {
    amount: 378.66,
    time: 1,
    v1: -1.358354,
    v2: -1.340163,
    v3: 1.773209,
    v4: 0.37978,
    v5: -0.503198,
    v6: 1.800499,
    v7: 0.791461,
    v8: 0.247676,
    v9: -1.514654,
    v10: 0.207643,
    v11: 0.247998,
    v12: 0.771679,
    v13: 0.909412,
    v14: -0.689281,
    v15: -0.327642,
    v16: -0.139097,
    v17: -0.055353,
    v18: -0.059752,
    v19: 0.247998,
    v20: 0.771679,
    v21: 0.909412,
    v22: -0.689281,
    v23: -0.327642,
    v24: -0.139097,
    v25: -0.055353,
    v26: -0.059752,
    v27: -0.055353,
    v28: -0.059752,
  },
  fraudulent2: {
    amount: 2125.87,
    time: 1,
    v1: -1.158233,
    v2: 0.877737,
    v3: 1.548718,
    v4: 0.403034,
    v5: -0.407193,
    v6: 2.301871,
    v7: 2.500893,
    v8: -1.509871,
    v9: 0.16537,
    v10: 2.032923,
    v11: -6.560371,
    v12: 0.022937,
    v13: -2.234826,
    v14: 3.00416,
    v15: -4.254772,
    v16: 0.205977,
    v17: -0.147004,
    v18: -0.751367,
    v19: 0.16537,
    v20: 2.032923,
    v21: -6.560371,
    v22: 0.022937,
    v23: -2.234826,
    v24: 3.00416,
    v25: -4.254772,
    v26: 0.205977,
    v27: -0.147004,
    v28: -0.751367,
  },
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    time: "",
    v1: "",
    v2: "",
    v3: "",
    v4: "",
    v5: "",
    v6: "",
    v7: "",
    v8: "",
    v9: "",
    v10: "",
    v11: "",
    v12: "",
    v13: "",
    v14: "",
    v15: "",
    v16: "",
    v17: "",
    v18: "",
    v19: "",
    v20: "",
    v21: "",
    v22: "",
    v23: "",
    v24: "",
    v25: "",
    v26: "",
    v27: "",
    v28: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const loadTestCase = (testCase: keyof typeof testCases) => {
    // Convert numbers to strings for form data
    const stringifiedData = Object.entries(testCases[testCase]).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.toString(),
      }),
      {} as FormData
    );

    setFormData(stringifiedData as FormData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Credit Card Transaction Details
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Test Cases:
        </Typography>
        <ButtonGroup variant="contained" sx={{ mt: 2, mb: 2 }}>
          <Button onClick={() => loadTestCase("legitimate1")}>
            Legitimate 1
          </Button>
          <Button onClick={() => loadTestCase("legitimate2")}>
            Legitimate 2
          </Button>
          <Button onClick={() => loadTestCase("fraudulent1")}>
            Fraudulent 1
          </Button>
          <Button onClick={() => loadTestCase("fraudulent2")}>
            Fraudulent 2
          </Button>
        </ButtonGroup>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <MuiGrid container spacing={2}>
          <MuiGrid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </MuiGrid>
          <MuiGrid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="number"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </MuiGrid>
          {Array.from({ length: 28 }, (_, i) => (
            <MuiGrid item xs={12} sm={6} md={4} key={`v${i + 1}`}>
              <TextField
                fullWidth
                label={`V${i + 1}`}
                name={`v${i + 1}`}
                type="number"
                value={formData[`v${i + 1}` as keyof FormData]}
                onChange={handleChange}
                required
              />
            </MuiGrid>
          ))}
          <MuiGrid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Check for Fraud
            </Button>
          </MuiGrid>
        </MuiGrid>
      </Box>
    </Paper>
  );
};

export default TransactionForm;
