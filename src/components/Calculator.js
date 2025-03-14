import React, { useState, useEffect } from "react";
import { Button, TextField, List, ListItem, Box, Typography, Paper, Grid, MenuItem, Select } from "@mui/material";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [unitValue, setUnitValue] = useState(1);
  const [unitFrom, setUnitFrom] = useState("cm");
  const [unitTo, setUnitTo] = useState("m");
  const [convertedValue, setConvertedValue] = useState("");

  // Unit conversion map
  const conversionRates = {
    cm: { m: 0.01, km: 0.00001, inch: 0.393701, foot: 0.0328084 },
    m: { cm: 100, km: 0.001, inch: 39.3701, foot: 3.28084 },
    km: { cm: 100000, m: 1000, inch: 39370.1, foot: 3280.84 },
    inch: { cm: 2.54, m: 0.0254, km: 0.0000254, foot: 0.0833333 },
    foot: { cm: 30.48, m: 0.3048, km: 0.0003048, inch: 12 },
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(expression);
      setResult(calculatedResult);
      setHistory([...history, `${expression} = ${calculatedResult}`]);
    } catch {
      setResult("Error");
    }
  };

  const handleUnitConversion = () => {
    if (unitFrom !== unitTo) {
      setConvertedValue((unitValue * conversionRates[unitFrom][unitTo]).toFixed(4));
    } else {
      setConvertedValue(unitValue);
    }
  };

  useEffect(() => {
    handleUnitConversion();
  }, [unitValue, unitFrom, unitTo]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#1e1e2e",
        color: "#ffffff",
        padding: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: "500px",
          width: "100%",
          background: "#2c2c3d",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          Material Design Calculator
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          placeholder="Enter expression (e.g., 2+2)"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          sx={{ bgcolor: "#333", borderRadius: 1, input: { color: "white" } }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleCalculate}
          sx={{ mt: 2, bgcolor: "#008080", "&:hover": { bgcolor: "#006666" } }}
        >
          Calculate
        </Button>

        <Typography variant="h5" align="center" sx={{ mt: 2, color: "#FFD700" }}>
          Result: {result}
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Scientific Functions
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {["sin", "cos", "tan", "sqrt", "log"].map((func) => (
            <Grid item xs={4} key={func}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setExpression(expression + `Math.${func}(`)}
                sx={{ color: "white", borderColor: "#FFD700", "&:hover": { borderColor: "#ffcc00" } }}
              >
                {func.toUpperCase()}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* ✅ Unit Converter Section */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Unit Converter
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <TextField
            type="number"
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
            sx={{ bgcolor: "#333", borderRadius: 1, input: { color: "white" } }}
          />
          <Select
            value={unitFrom}
            onChange={(e) => setUnitFrom(e.target.value)}
            sx={{ bgcolor: "#333", color: "white" }}
          >
            {Object.keys(conversionRates).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
          <Typography>➡</Typography>
          <Select
            value={unitTo}
            onChange={(e) => setUnitTo(e.target.value)}
            sx={{ bgcolor: "#333", color: "white" }}
          >
            {Object.keys(conversionRates).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Typography align="center" sx={{ mt: 1, color: "#FFD700" }}>
          Converted: {convertedValue} {unitTo}
        </Typography>

        {/* ✅ Formula Library */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Formula Library
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {[
            { label: "Circle Area", formula: "π*r*r" },
            { label: "Rectangle Perimeter", formula: "2*(l+w)" },
            { label: "Force (Newton's Law)", formula: "F=m*a" },
            { label: "Einstein's Energy", formula: "E=m*c^2" },
            { label: "Volume of a Box", formula: "V=l*w*h" },
          ].map((item) => (
            <Grid item xs={6} key={item.label}>
              <Button
                fullWidth
                variant="text"
                onClick={() => setExpression(expression + item.formula)}
                sx={{ color: "#FFD700", "&:hover": { color: "#ffcc00" } }}
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>
          History:
        </Typography>
        <Paper
          sx={{
            mt: 1,
            maxHeight: "150px",
            overflowY: "auto",
            bgcolor: "#333",
            padding: 1,
            borderRadius: 1,
          }}
        >
          <List>
            {history.map((item, index) => (
              <ListItem key={index} sx={{ color: "#FFD700", fontSize: "14px" }}>
                {item}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Calculator;
