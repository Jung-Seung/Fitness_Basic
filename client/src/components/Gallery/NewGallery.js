import React, { Component } from "react";
import axios from "axios";
import "../../css/Gallery/NewGallery.css";

class NewGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newImg: null,
      newContents: "",
      newWriter: "",
      newWriteDate: "",
    };
  }

  handleCreateGallery = async () => {
    const { newTitle, newImg, newContents, newWriter, newWriteDate } = this.state;

    try {
      const formData = new FormData();
      formData.append("img", newImg);

      const uploadResponse = await axios.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { imgName } = uploadResponse.data;

      await axios.post("/gallery", {
        title: newTitle,
        img: imgName,
        contents: newContents,
        writer: newWriter,
        writeDate: newWriteDate,
      });

      this.resetForm();
      this.props.fetchGalleryList();
    } catch (error) {
      console.error("Error creating gallery:", error);
      alert("이미지가 업로드되지 않았습니다.");
    }
  };

  handleDeleteGallery = (no) => {
    axios
      .delete(`/gallery/${no}`)
      .then((response) => {
        console.log("Gallery deleted:", response.data);
        this.props.fetchGalleryList();
      })
      .catch((error) => {
        console.error("Error deleting gallery:", error);
      });
  };

  resetForm = () => {
    this.setState({
      newTitle: "",
      newImg: null,
      newContents: "",
      newWriter: "",
      newWriteDate: "",
    });
  };

  handleImgSelect = (e) => {
    const file = e.target.files[0];
    const imgName = e.target.value;
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        this.setState({ file, imgName });
      } else {
        console.error("Invalid file type. Please select a JPEG or PNG image.");
        alert("유효하지 않은 이미지 유형입니다. JPEG 또는 PNG 파일을 사용해주세요.");
      }
    } else {
      console.error("No img selected. Please choose an image.");
      alert("이미지가 선택되지 않았습니다. 이미지를 첨부해주세요.");
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { newTitle, imgName, newContents, newWriter, newWriteDate } = this.state;

    return (
      <div id="new-gallery">
        <h3>새 글 작성</h3>
        <div id="new-title">
          <label htmlFor="newTitle">제목:</label>
          <input
            type="text"
            id="newTitle"
            name="newTitle"
            value={newTitle}
            onChange={this.handleInputChange}
          />
        </div>
        <div id="new-img">
          <label htmlFor="img">이미지:</label>
          <input
            type="file"
            id="img"
            name="img"
            value={imgName}
            onChange={this.handleInputChange}
          />
        </div>
        <div id="new-contents">
          <label htmlFor="newContents">내용:</label>
          <textarea
            id="newContents"
            name="newContents"
            value={newContents}
            onChange={this.handleInputChange}
          ></textarea>
        </div>
        <div id="new-writer">
          <label htmlFor="newWriter">작성자:</label>
          <input
            type="text"
            id="newWriter"
            name="newWriter"
            value={newWriter}
            onChange={this.handleInputChange}
          />
        </div>
        <div id="new-writeDate">
          <label htmlFor="newWriteDate">작성일:</label>
          <input
            type="date"
            id="newWriteDate"
            name="newWriteDate"
            value={newWriteDate}
            onChange={this.handleInputChange}
          />
        </div>
        <div id="Scbutton">
          <button onClick={this.handleCreateGallery}>저장</button>
          <button onClick={this.resetForm}>취소</button>
        </div>
      </div>
    );
  }
}

export default NewGallery;
