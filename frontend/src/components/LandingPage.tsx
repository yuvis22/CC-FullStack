import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
  position: "relative",
  overflow: "auto",
  "& .MuiContainer-root": {
    margin: 0,
    padding: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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

const AnimatedButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 5),
  fontSize: "1.1rem",
  borderRadius: theme.shape.borderRadius * 3,
  background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
  color: "white",
  boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
  },
}));

const StyledSecurityIcon = styled(SecurityIcon)(({ theme }) => ({
  fontSize: "4rem",
  marginBottom: theme.spacing(2),
  color: "#2196f3",
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius * 2,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  width: "100%",
  maxWidth: "900px",
  margin: theme.spacing(8, 0),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius * 2,
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const MainContent = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(8, 4),
}));

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <Container maxWidth="lg">
        <MainContent>
          <Box sx={{ textAlign: "center", mb: 4, maxWidth: "800px" }}>
            <StyledSecurityIcon />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #2196f3, #64b5f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              FraudGuard AI
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                color: "#90caf9",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Advanced Credit Card Fraud Detection System
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mx: "auto",
                color: "#b3e5fc",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Protect your transactions with our state-of-the-art AI-powered
              fraud detection system. We analyze multiple parameters in
              real-time to ensure your financial security.
            </Typography>
          </Box>

          <StatsSection>
            <StatCard>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#2196f3"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  mb: 1,
                }}
              >
                $24B+
              </Typography>
              <Typography variant="body1" color="#90caf9" sx={{ opacity: 0.9 }}>
                Annual Fraud Prevention
              </Typography>
            </StatCard>
            <StatCard>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#2196f3"
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                99.9%
              </Typography>
              <Typography variant="body1" color="#90caf9">
                Detection Accuracy
              </Typography>
            </StatCard>
            <StatCard>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#2196f3"
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                &lt;1s
              </Typography>
              <Typography variant="body1" color="#90caf9">
                Response Time
              </Typography>
            </StatCard>
          </StatsSection>

          <Box sx={{ width: "100%", maxWidth: "800px" }}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <FeatureCard>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <VerifiedUserIcon sx={{ fontSize: 32, color: "#2196f3" }} />
                    <Typography
                      variant="h6"
                      color="#90caf9"
                      sx={{ fontSize: "1.1rem" }}
                    >
                      Real-Time Protection
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="#b3e5fc"
                    sx={{ opacity: 0.9 }}
                  >
                    Our AI model analyzes transactions in real-time, providing
                    immediate fraud detection and prevention capabilities.
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid item>
                <FeatureCard>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TrendingUpIcon sx={{ fontSize: 32, color: "#2196f3" }} />
                    <Typography
                      variant="h6"
                      color="#90caf9"
                      sx={{ fontSize: "1.1rem" }}
                    >
                      Advanced Analytics
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="#b3e5fc"
                    sx={{ opacity: 0.9 }}
                  >
                    Utilizing machine learning algorithms to detect patterns and
                    anomalies in transaction behavior.
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid item>
                <FeatureCard>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <WarningIcon sx={{ fontSize: 32, color: "#2196f3" }} />
                    <Typography
                      variant="h6"
                      color="#90caf9"
                      sx={{ fontSize: "1.1rem" }}
                    >
                      Fraud Alerts
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="#b3e5fc"
                    sx={{ opacity: 0.9 }}
                  >
                    Instant notifications and detailed analysis reports for
                    suspicious transaction activities.
                  </Typography>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              p: 4,
              width: "100%",
              maxWidth: "900px",
              borderRadius: 3,
              background: "rgba(255, 152, 0, 0.1)",
              border: "1px solid rgba(255, 152, 0, 0.3)",
              mt: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color="#ffb74d"
              sx={{ fontSize: "1.1rem" }}
            >
              🚨 Did You Know?
            </Typography>
            <Typography
              variant="body1"
              color="#ffe0b2"
              sx={{ lineHeight: 1.6 }}
            >
              Credit card fraud results in billions of dollars in losses
              annually. Common types include card skimming, identity theft, and
              online transaction fraud. Our system helps protect against these
              threats using advanced AI technology.
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <AnimatedButton
              variant="contained"
              onClick={() => navigate("/analyze")}
              startIcon={<SecurityIcon />}
            >
              Start Analyzing Transactions
            </AnimatedButton>
          </Box>
        </MainContent>
      </Container>
    </HeroSection>
  );
};

export default LandingPage;
