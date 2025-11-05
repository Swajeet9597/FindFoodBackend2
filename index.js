require('dotenv').config();
const express = require("express")
const app = express()
const dbConnect = require("./DB/db");
const router = require('./routes/authRoutes');
const messDataRoutes = require('./routes/messFormRoutes')
const customerRoute = require("./routes/customerRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const corsOption = {
    origin: ["http://localhost:4200", "http://localhost:3000",'http://localhost:5173'],
    methods:"POST,GET,PATCH,DELETE,HEAD",
    credentials: true,
}

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use("/api/user/",router)
app.use("/api/user/",messDataRoutes)
app.use("/api/user/",customerRoute)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

dbConnect()
