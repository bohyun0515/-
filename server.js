require('dotenv').config();
const express = require('express');
const path = require('path');
const submitHandler = require('./api/submit');

const app = express();

// JSON 본문 파싱
app.use(express.json());

// 정적 파일 제공 (HTML, CSS, 이미지 등)
app.use(express.static(path.join(__dirname, '/')));

// 서버리스 함수 로컬 라우팅 시뮬레이션
app.post('/api/submit', (req, res) => {
  submitHandler(req, res).catch(error => {
    console.error("Local Error:", error);
    res.status(500).json({ message: '로컬 서버 에러', error: error.message });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 로컬 테스트 서버가 실행되었습니다!`);
  console.log(`👉 브라우저를 열고 http://localhost:${PORT} 에 접속하세요.`);
  console.log(`========================================`);
});
