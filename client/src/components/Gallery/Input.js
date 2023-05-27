import React, { Component } from "react";
import "../../css/Gallery/Input.css";
import axios from "axios";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      file: null,
      imgPreview: null,
      contents: "",
      writer: "",
      writeDate: "",
    };
  }

  addGalleryInfo = async () => {
    const { title, file, contents, writer, writeDate } = this.state;
    try {
      const formData = new FormData();
      formData.append("img", file);

      const uploadResponse = await axios.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { imgName } = uploadResponse.data;

      await axios.post("/gallery", {
        title,
        img: imgName,
        contents,
        writer,
        writeDate,
      });

      this.setState({
        title: "",
        file: null,
        imgPreview: null,
        contents: "",
        writer: "",
        writeDate: "",
      });

      // 추가한 갤러리 정보를 상위 컴포넌트로 전달
      this.props.addGalleryInfo(title, file, contents, writer, writeDate);
    } catch (error) {
      console.error("Error adding gallery info:", error);
      alert("이미지가 업로드되지 않았습니다.");
    }
  };

  handleImgSelect = (e) => {
    const file = e.target.files[0];
    const imgPreview = URL.createObjectURL(file);
    if (file) {
      // 파일 유효성 검사 로직 추가
      const allowedTypes = ["image/jpeg", "image/png"]; // 허용된 파일 유형
      if (allowedTypes.includes(file.type)) {
        // 유효한 파일 유형인 경우
        this.setState({ file, imgPreview });
      } else {
        // 유효하지 않은 파일 유형인 경우에 대한 처리
        console.error("Invalid file type. Please select a JPEG or PNG image.");
        // 파일 선택을 초기화하거나 사용자에게 알림을 표시할 수 있습니다.
        alert(
          "유효하지 않은 이미지 유형입니다. JPEG 또는 PNG 파일을 사용해주세요."
        );
      }
    } else {
      // 파일 선택하지 않은 경우에 대한 처리
      console.error("No img selected. Please choose an image.");
      // 사용자에게 알림을 표시할 수 있습니다.
      alert("이미지가 선택되지 않았습니다. 이미지를 첨부해주세요.");
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { title, imgPreview, contents, writer, writeDate } = this.state;
    return (
      <div id="input">
        <div id="input-head">갤러리 추가</div>
        <div id="input-title">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            placeholder="제목 입력"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div id="input-img">
          <label htmlFor="img">이미지:</label>
          <input type="file" name="img" onChange={this.handleImgSelect} />
          <div id="show-img">
            {imgPreview && <img src={imgPreview} alt="show-img" />}
          </div>
        </div>
        <div id="input-contents">
          <label htmlFor="contents">내용:</label>
          <textarea
            id="contents"
            name="contents"
            value={contents}
            onChange={this.handleChange}
          ></textarea>
        </div>
        <div id="input-write">
        <label htmlFor="writer">작성자:</label>
          <input
            type="text"
            placeholder="작성자 입력"
            name="writer"
            value={writer}
            onChange={this.handleChange}
          />
        </div>
        <div id="input-writeDate">
        <label htmlFor="writeDate">작성일:</label>
          <input
            type="date"
            placeholder="날짜 입력"
            name="writeDate"
            value={writeDate}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.addGalleryInfo}>추가</button>
      </div>
    );
  }
}

export default Input;
