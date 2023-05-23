const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/gallery');
    // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = `${Date.now()}${extension}`;
    cb(null, filename);
    // 파일명을 원하는 형식으로 수정
  }
});

const patch = multer({ storage: storage }).single('gallery');
// single: 하나의 파일을 업로드할 때

module.exports = patch;
