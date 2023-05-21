import React, { Component } from 'react';
import '../../css/Board/BoardDetail.css';
import axios from 'axios';

class BoardDetail extends Component {
  constructor(props) {
    super(props);
    const { board } = props;
    this.state = {
      showEditForm: false,
      title: board.title,
      contents: board.contents,
      writer: board.writer,
      writeDate: board.writeDate,
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
    const { board, onDelete } = this.props;
    axios
      .delete(`/board/${board.no}`)
      .then((response) => {
        alert('게시글이 삭제되었습니다.');
        onDelete(board.no); // 삭제된 게시글의 ID를 상위 컴포넌트로 전달
        console.log('Board deleted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting board:', error);
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUpdateClick = () => {
    const { board, onUpdate } = this.props;
    const { title, contents, writer, writeDate } = this.state;
    const updatedBoard = { ...board, title, contents, writer, writeDate };
    axios
      .put(`/board/${board.no}`, updatedBoard)
      .then((response) => {
        alert('게시글이 수정되었습니다.');
        onUpdate(updatedBoard); // 수정된 게시글 정보를 상위 컴포넌트로 전달
        this.setState({ showEditForm: false });
        console.log('Board updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating board:', error);
      });
  };

  componentDidMount() {
    // 게시글 목록 데이터를 서버에서 가져와 설정
    axios
      .get('/board')
      .then((response) => {
        this.setState({
          boardList: response.data,
        });
        console.log('Board list retrieved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error retrieving board list:', error);
      });
  }

  render() {
    const { board } = this.props;
    const { showEditForm, title, contents, writer, writeDate } = this.state;

    if (!board) {
      return <div>Loading...</div>;
    }

    return (
      <div id="board-detail">
        {showEditForm ? (
          <form id='re-board'>
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
            <div id="title">{board.title}</div>
            <div id="contents">{board.contents}</div>
            <div id="writer">{board.writer}</div>
            <div id="writeDate">{board.writeDate}</div>
            <button onClick={this.handleBackClick}>뒤로 가기</button>
            <button onClick={this.handleEditClick}>수정</button>
            <button onClick={this.handleDeleteClick}>삭제</button>
          </>
        )}
      </div>
    );
  }
}

export default BoardDetail;
