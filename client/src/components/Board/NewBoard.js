import '../../css/Board/NewBoard.css';
import React, { Component } from "react";
import axios from "axios";

class NewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newContents: "",
      newWriter: "",
      newWriteDate: "",
    };
  }

  handleCreateBoard = () => {
    const { newTitle, newContents, newWriter, newWriteDate } = this.state;
    axios
      .post("/board", {
        title: newTitle,
        contents: newContents,
        writer: newWriter,
        writeDate: newWriteDate,
      })
      .then((response) => {
        console.log("Board created:", response.data);
        this.props.fetchBoardList(); // Board 컴포넌트의 fetchBoardList 메서드 호출
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error creating board:", error);
      });
  };

  handleDeleteBoard = (no) => {
    axios
      .delete(`/board/${no}`)
      .then((response) => {
        console.log("Board deleted:", response.data);
        this.props.fetchBoardList(); // Board 컴포넌트의 fetchBoardList 메서드 호출
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  resetForm = () => {
    this.setState({
      newTitle: "",
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
    const { newTitle, newContents, newWriter, newWriteDate } = this.state;

    return (
      <div id="new-board">
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
        <div id="SCbutton">
          <button onClick={this.handleCreateBoard}><a href="/board">저장</a></button>
          <button onClick={this.resetForm}><a href="/board">취소</a></button>
        </div>
      </div>
    );
  }
}

export default NewBoard;