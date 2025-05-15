// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// 저장 폴더 설정
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // index.html 등
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // 사진 접근용

// 업로드 API
app.post('/api/upload', upload.single('photo'), (req, res) => {
  res.send('사진 업로드 완료!');
});

// 관리자 페이지 (모든 사진 보여줌)
app.get('/admin', (req, res) => {
  const files = fs.readdirSync('uploads/');
  const imgTags = files.map(file => `<img src="/uploads/${file}" width="200"><br>`).join('');
  res.send(`<h1>업로드된 사진</h1>${imgTags}`);
});

// 서버 실행
app.listen(3000, () => console.log('http://localhost:3000 에서 실행 중'));
