import React, { Component } from 'react';
import '../../css/Gallery/GalleryDetail.css';
import axios from 'axios';

class GalleryDetail extends Component {
  constructor(props) {
    super(props);
    const { gallery } = props;
    this.state = {
      showEditForm: false,
      title: gallery.title,
      contents: gallery.contents,
      writer: gallery.writer,
      writeDate: gallery.writeDate,
    };
  }

  handleBackClick = () => {
    const { onBack } = this.props;
    if (onBack) {
      onBack();
    }
  };

  handleEditClick = () => {
    this.setState((prevState) => ({
      showEditForm: !prevState.showEditForm,
    }));
  };

  handleDeleteClick = () => {
    const { gallery, onDelete } = this.props;
    axios
      .delete(`/gallery/${gallery.no}`)
      .then((response) => {
        alert('게시글이 삭제되었습니다.');
        onDelete(gallery.no); // 삭제된 게시글의 ID를 상위 컴포넌트로 전달
        console.log('Gallery deleted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting gallery:', error);
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleUpdateClick = () => {
    const { gallery, onUpdate } = this.props;
    const { title, contents, writer, writeDate } = this.state;
    const updatedGallery = { ...gallery, title, contents, writer, writeDate };
    axios
      .put(`/gallery/${gallery.no}`, updatedGallery)
      .then((response) => {
        alert('게시글이 수정되었습니다.');
        onUpdate(updatedGallery); // 수정된 게시글 정보를 상위 컴포넌트로 전달
        this.setState({ showEditForm: false });
        console.log('Gallery updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating gallery:', error);
      });
  };

  componentDidMount() {
    // 게시글 목록 데이터를 서버에서 가져와 설정
    axios
      .get('/gallery')
      .then((response) => {
        this.setState({
            galleryList: response.data,
        });
        console.log('Gallery list retrieved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error retrieving gallery list:', error);
      });
  }

  render() {
    const { gallery } = this.props;
    const { showEditForm, title, contents, writer, writeDate } = this.state;

    if (!gallery) {
      return <div>Loading...</div>;
    }

    return (
      <div id="gallery-detail">
        {showEditForm ? (
          <form id='re-gallery'>
            <div id='re-title'>
              <label htmlFor="title">제목:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleInputChange}
              />
            </div>
            <div id='re-contents'>
              <label htmlFor="contents">내용:</label>
              <textarea
                id="contents"
                name="contents"
                value={contents}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <div id='re-writer'>
              <label htmlFor="writer">작성자:</label>
              <input
                type="text"
                id="writer"
                name="writer"
                value={writer}
                onChange={this.handleInputChange}
              />
            </div>
            <div id='re-writeDate'>
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
