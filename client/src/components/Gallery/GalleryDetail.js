import React, { Component } from "react";
import "../../css/Gallery/GalleryDetail.css";
import axios from "axios";

class GalleryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      title: "",
      file: null,
      imgPreview: null,
      contents: "",
      writer: "",
      writeDate: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { title, contents, writer, writeDate } = this.props;
      this.setState({
        title,
        contents,
        writer,
        writeDate,
      });
    }
  }

  handleBackClick = () => {
    const { onBack } = this.props;
    if (onBack) {
      onBack();
    }
  };

  handleEditClick = () => {
    const { gallery } = this.props;
    const { title, contents, writer, writeDate } = gallery;
  
    this.setState((prevState) => ({
      showEditForm: !prevState.showEditForm,
      title,
      contents,
      writer,
      writeDate,
    }));
  };

  handleDeleteClick = () => {
    const { gallery, onDelete } = this.props;
    axios
      .delete(`/gallery/${gallery.no}`)
      .then((response) => {
        alert("게시글이 삭제되었습니다.");
        onDelete(gallery.no);
        console.log("Gallery deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting gallery:", error);
      });
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleUpdateClick = () => {
    const { gallery, onUpdate } = this.props;
    const { title, file, contents, writer, writeDate } = this.state;

    const updatedGallery = new FormData();
    updatedGallery.append("title", title);
    if (file) {
      updatedGallery.append("img", file);
    }
    updatedGallery.append("contents", contents);
    updatedGallery.append("writer", writer);
    updatedGallery.append("writeDate", writeDate);

    axios
      .put(`/gallery/${gallery.no}`, updatedGallery)
      .then((response) => {
        alert("게시글이 수정되었습니다.");
        onUpdate(updatedGallery);
        this.setState({ showEditForm: false });
        console.log("Gallery updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating gallery:", error);
      });
  };

  render() {
    const { gallery } = this.props;
    const {
      showEditForm,
      title,
      imgPreview,
      contents,
      writer,
      writeDate,
    } = this.state;
    const show = `/uploads/gallery/${gallery.img}`;

    if (!gallery) {
      return <div>Loading...</div>;
    }

    return (
      <div id="gallery-detail">
        {showEditForm ? (
          <form id="re-gallery">
            <div id="gal-title">
              <label htmlFor="title">제목:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleInputChange}
              />
            </div>
            <div id="gal-img">
              <label htmlFor="img">이미지:</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={this.handleImgSelect}
              />
              <div id="show-imgpre">
                {imgPreview && <img src={imgPreview} alt="show-imgpre" />}
              </div>
            </div>
            <div id="gal-contents">
              <label htmlFor="contents">내용:</label>
              <textarea
                id="contents"
                name="contents"
                value={contents}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <div id="gal-writer">
              <label htmlFor="writer">작성자:</label>
              <input
                type="text"
                id="writer"
                name="writer"
                value={writer}
                onChange={this.handleInputChange}
              />
            </div>
            <div id="gal-writeDate">
              <label htmlFor="writeDate">작성일:</label>
              <input
                type="date"
                id="writeDate"
                name="writeDate"
                value={writeDate}
                onChange={this.handleInputChange}
              />
            </div>
            <button onClick={this.handleUpdateClick}>확인</button>
            <button onClick={this.handleEditClick}>취소</button>
          </form>
        ) : (
          <>
            <div id="title">{gallery.title}</div>
            <div id="img">
              <img src={show} alt="gallery-img" />
            </div>
            <div id="contents">{gallery.contents}</div>
            <div id="writer">{gallery.writer}</div>
            <div id="writeDate">{gallery.writeDate}</div>
            <button onClick={this.handleBackClick}>뒤로 가기</button>
            <button onClick={this.handleEditClick}>수정</button>
            <button onClick={this.handleDeleteClick}>삭제</button>
          </>
        )}
      </div>
    );
  }
}

export default GalleryDetail;
