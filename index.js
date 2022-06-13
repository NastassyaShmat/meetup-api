import express from "express";

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).json("server is working");
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
