require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./DB/db");
const router = require("./routes/authRoutes");
const messDataRoutes = require("./routes/messFormRoutes");
const customerRoute = require("./routes/customerRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ Allowed origins — Angular, React, and deployed frontend (optional)
const allowedOrigins = [
  "http://localhost:4200",  // Angular
  // "http://localhost:3000",  // React
  // "http://localhost:5173",  // (optional) Vite/React dev server
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

// ✅ Handle preflight requests globally
app.options("*", cors(corsOptions));

// ✅ Routes
app.use("/api/user/", router);
app.use("/api/user/", messDataRoutes);
app.use("/api/user/", customerRoute);

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

dbConnect();
