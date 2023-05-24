import '../../css/Gallery/NewGallery.css';
import React, { Component } from "react";
import axios from "axios";

class NewGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      img: null,
      imgName: "",
      newContents: "",
      newWriter: "",
      newWriteDate: "",
    };
  }

  handleCreateGallery = async() => {
    const { newTitle, img, newContents, newWriter, newWriteDate } = this.state;
    
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
          title: newTitle,
          img: imgName,
          contents: newContents,
          writer: newWriter,
          writeDate: newWriteDate
        });
  
        this.setState({ title: newTitle, img: null, contents: newContents, writer: newWriter, writeDate: newWriteDate });
        this.props.fetchGalleryList();
      } catch (error) {
        console.error("Error creating gallery:", error);
        alert("이미지가 업로드되지 않았습니다.");
      }
    };

//     axios
//       .post("/gallery", {
//         title: newTitle,
//         contents: newContents,
//         writer: newWriter,
//         writeDate: newWriteDate,
//       })
//       .then((response) => {
//         console.log("Gallery created:", response.data);
//         this.props.fetchGalleryList();
//         this.resetForm();
//       })
//       .catch((error) => {
//         console.error("Error creating gallery:", error);
//       });
//   };

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
      imgName: null,
      newContents: "",
      newWriter: "",
      newWriteDate: "",
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
          <label htmlFor="newImg">이미지:</label>
          <input
            type="file"
            id="imgName"
            name="imgName"
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
          <button onClick={this.handleCreateGallery}><a href="/gallery">저장</a></button>
          <button onClick={this.resetForm}><a href="/gallery">취소</a></button>
        </div>
      </div>
    );
  }
}

export default NewGallery;
