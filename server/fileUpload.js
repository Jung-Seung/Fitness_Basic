const multer = require("multer");
const path = require("path");

const storagePerson = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/person');
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

const personUpload = multer({ storage: storagePerson }).single('profile');

module.exports = personUpload;
