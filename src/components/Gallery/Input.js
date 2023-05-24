import '../../css/Gallery/Input.css';
import React, { Component } from 'react'
import axios from "axios";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: null,
      imgName: "",
      contents: "",
      writer: "",
      writeDate: "",
    };
  }

  addGalleryInfo = async () => {
    const { title, img, contents, writer, writeDate } = this.state;
    try {
      const formData = new FormData();
      formData.append("gallery", img);

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
        writeDate
      });

      this.setState({ title: "", img: null, contents: "", writer: "",writeDate: "" });
      this.props.fetchGalleryList();
    } catch (error) {
      console.error("Error adding gallery info:", error);
      alert("이미지가 업로드되지 않았습니다.");
    }
  };

  handleImgSelect = (e) => {
    const img = e.target.files[0];
    const imgName = e.target.value;
    if (img) {
      // 파일 유효성 검사 로직 추가
      const allowedTypes = ["image/jpeg", "image/png"]; // 허용된 파일 유형
      if (allowedTypes.includes(img.type)) {
        // 유효한 파일 유형인 경우
        this.setState({ img, imgName });
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
    return (
      <div id="input">
        <div id="input-head">갤러리 추가</div>
        <div id="input-title">
        <input
          type="text"
          placeholder="제목 입력"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        </div>
        <div id="input-img">
          <input
            type="file"
            name="img"
            value={this.state.imgName}
            onChange={this.handleImgSelect}
          />
        </div>
        <div id="input-contents">
        <input
          type="text"
          placeholder="내용 입력"
          name="contents"
          value={this.state.contents}
          onChange={this.handleChange}
        />
        </div>
        <div id="input-write">
        <input
          type="text"
          placeholder="작성자 입력"
          name="writer"
          value={this.state.writer}
          onChange={this.handleChange}
        />
        <input
          type="date"
          placeholder="날짜 입력"
          name="writeDate"
          value={this.state.writeDate}
          onChange={this.handleChange}
        />
        </div>
          <button
            onClick={() =>
              this.props.addGalleryInfo(
                this.state.title,
                this.state.imgName,
                this.state.contents,
                this.state.writer,
                this.state.writeDate
            )}>
            추가
          </button>
      </div>
    );
  }
}

export default Input;