const express = require("express");
const cors = require("cors");

const reportRoutes = require("./routes/reports");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/reports", reportRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("NGO Reporting Backend is running");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
