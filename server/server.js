const express = require("express");
const app = express();
const upload = require("./fileUpload.js");
const PORT = process.env.PORT || 4000;
const db = require("../config/db.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//board
app.get("/board", (req, res) => {
  console.log("/board");
  db.query("select * from board order by no DESC", (err, data) => {
    if (!err) {
      //console.log(data)
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/board/:no", (req, res) => {
  console.log("/board/:no");
  const no = req.params.no;
  db.query(`select * from board where no=${no}`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
app.post("/board", (req, res) => {
  console.log("/board(POST)");
  console.log(req.body);
  const { title, contents, writer, writeDate } = req.body;
  db.query(
    `insert into board(title,contents,writer,writeDate)
    values('${title}','${contents}','${writer}','${writeDate}')`,
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    }
  );
});
app.put("/board/:no", (req, res) => {
  console.log("/board/:no(PUT)");
  const no = req.params.no;
  console.log(no);
  console.log(req.body);
  const { title, contents } = req.body;
  db.query(
    `update board set title='${title}',contents='${contents}' where no=${no}`,
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    }
  );
});
app.delete("/board/:no", (req, res) => {
  console.log("/board/:no(DELETE)");
  const no = req.params.no;
  db.query(`delete from board where no=${no}`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//person
app.get("/person", (req, res) => {
  console.log("/person");
  db.query("select * from person", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/person/:id", (req, res) => {
  console.log("/person/:id");
  const id = req.params.id;
  db.query(`select * from person where id=${id}`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

app.post('/person', upload, (req, res) => {
  console.log('/person(POST)');
  console.log(req.body);
  if (!req.body.profile) {
    // Profile data does not exist
    console.log('No profile data uploaded');
    return res.status(400).json({ success: 0, error: 'No profile data uploaded' });
  }
  console.log('파일:', req.body.profile); // Profile data
  const { name, charge, word, profile } = req.body;
  // Insert the data into the database
  db.query(
    `INSERT INTO person (name, charge, word, profile)
    VALUES ('${name}', '${charge}', '${word}', '${profile}')`,
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    }
  );
});

//fileupload
app.post("/api/upload", upload, (req, res) => {
  console.log("/api/upload");
  if (!req.file) {
    return res.status(400).json({ success: 0, error: "No file uploaded" });
  }
  console.log("원본파일명: " + req.file.originalname);
  console.log("저장파일명: " + req.file.filename);
  console.log("크기: " + req.file.size);

  return res.json({
    success: 1,
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

app.put("/person/:id", (req, res) => {
  console.log("/person(PUT)");
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  const { charge, word } = req.body;
  db.query(
    `update person set charge='${charge}',word='${word}' where id=${id}`,
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    }
  );
});
app.delete("/person/:id", (req, res) => {
  console.log("/person/:id(DELETE)");
  const id = req.params.id;
  db.query(`delete from person where id=${id}`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}`);
});
