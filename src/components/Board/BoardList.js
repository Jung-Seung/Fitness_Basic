import React, { Component } from "react";
import '../../css/Board/BoardList.css';
import TakeBoard from "./TakeBoard.js";
import BoardDetail from "./BoardDetail.js";

class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBoard: null,
      showBoardDetail: false,
      boardList: props.boardList || [],
    };
  }

  handleBoardClick = (board) => {
    this.setState({
      selectedBoard: board,
      showBoardDetail: true,
    });
  };

  handleBack = () => {
    this.setState({
      showBoardDetail: false,
    });
  };

  handleDelete = (boardNo) => {
    // 게시글 삭제 후 목록 갱신
    this.setState((prevState) => ({
      boardList: prevState.boardList.filter((board) => board.no !== boardNo),
    }));
  };

  handleUpdate = (updatedBoard) => {
    // 게시글 수정 후 목록 갱신
    this.setState((prevState) => ({
      boardList: prevState.boardList.map((board) =>
        board.no === updatedBoard.no ? updatedBoard : board
      ),
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.boardList !== this.props.boardList) {
      this.setState({
        boardList: this.props.boardList,
      });
    }
  }

  render() {
    const { boardList, selectedBoard, showBoardDetail } = this.state;

    if (showBoardDetail) {
      return (
        <div id="board-list">
          <BoardDetail
            board={selectedBoard}
            onBack={this.handleBack}
            onDelete={this.handleDelete}
            onUpdate={this.handleUpdate}
          />
        </div>
      );
    }

    const result = boardList.map((data) => (
      <TakeBoard
        key={data.no}
        no={data.no}
        title={data.title}
        writer={data.writer}
        writeDate={data.writeDate}
        onClick={() => this.handleBoardClick(data)}
      />
    ));

    return (
      <div id="board-list">
        <div id="list-header">
        <TakeBoard
          no="번호"
          title="제목"
          writer="글쓴이"
          writeDate="글쓴날짜"
        />
        </div>
        {result}
      </div>
    );
  }
}

export default BoardList;
