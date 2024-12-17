// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

// 정적 파일 서비스 (HTML, CSS, JS 등)
app.use(express.static(path.join(__dirname, "public")));

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
