import React, { Component } from "react";
import "../../css/Teach/InputComp.css";
import axios from "axios";

class InputComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      charge: "",
      word: "",
      file: null,
      fileName: "",
    };
  }

  addPersonInfo = async () => {
    const { name, charge, word, file } = this.state;
    try {
      const formData = new FormData();
      formData.append("profile", file);

      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName } = uploadResponse.data;

      await axios.post("/person", {
        name,
        charge,
        word,
        profile: fileName,
      });

      this.setState({ name: "", charge: "", word: "", file: null });
      this.props.fetchPersonList();
    } catch (error) {
      console.error("Error adding person info:", error);
      alert("파일이 업로드되지 않았습니다.");
    }
  };

  handleFileSelect = (e) => {
    const file = e.target.files[0];
    const fileName = e.target.value;
    if (file) {
      // 파일 유효성 검사 로직 추가
      const allowedTypes = ["image/jpeg", "image/png"]; // 허용된 파일 유형
      if (allowedTypes.includes(file.type)) {
        // 유효한 파일 유형인 경우
        this.setState({ file, fileName });
      } else {
        // 유효하지 않은 파일 유형인 경우에 대한 처리
        console.error("Invalid file type. Please select a JPEG or PNG image.");
        // 파일 선택을 초기화하거나 사용자에게 알림을 표시할 수 있습니다.
        alert(
          "유효하지 않은 파일 유형입니다. JPEG 또는 PNG 파일을 사용해주세요."
        );
      }
    } else {
      // 파일 선택하지 않은 경우에 대한 처리
      console.error("No file selected. Please choose an image.");
      // 사용자에게 알림을 표시할 수 있습니다.
      alert("파일이 선택되지 않았습니다. 이미지를 첨부해주세요.");
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
      <div id="input-comp">
        <div id="input-header">강사진 추가</div>
        <input
          type="text"
          placeholder="이름 입력"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="담당 입력"
          name="charge"
          value={this.state.charge}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="한마디 입력"
          name="word"
          value={this.state.word}
          onChange={this.handleChange}
        />
        <div id="input-file">
          <input
            type="file"
            name="profile"
            value={this.state.fileName}
            onChange={this.handleFileSelect}
          />
        </div>
          <button
            onClick={() =>
              this.props.addPersonInfo(
                this.state.name,
                this.state.charge,
                this.state.word,
                this.state.file
              )
            }
          >
            추가
          </button>
      </div>
    );
  }
}

export default InputComp;
