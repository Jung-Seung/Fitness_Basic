import React, { Component } from "react";
import "../css/Board.css";
import BoardList from "./Board/BoardList.js"
import Pagination from "./Board/Pagination.js";
import axios from "axios";
import NewBoard from "./Board/NewBoard.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardList: [],
      boardPerPage: 10,
      currentPage: 1,
      showNewBoard: false,
    };
  }

  componentDidMount() {
    this.fetchBoardList();
  }

  fetchBoardList = () => {
    const { boardPerPage, currentPage } = this.state;
    const offset = (currentPage - 1) * boardPerPage;
    const apiUrl = `/board?limit=${boardPerPage}&offset=${offset}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ boardList: response.data });
      })
      .catch((error) => {
        console.error("Error fetching board list:", error);
      });
  };

  handleToggleNewBoard = () => {
    this.setState((prevState) => ({
      showNewBoard: !prevState.showNewBoard,
    }));
  };

  formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("ko-KR", options);
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.fetchBoardList();
    });
  };

  render() {
    const { boardList, boardPerPage, currentPage, showNewBoard } = this.state;

    if (boardList.length === 0) {
      return (
        <div id="board">
          <p>게시글이 없습니다.</p>
        </div>
      );
    }

    const totalBoards = boardList.length;
    const lastPage = Math.ceil(totalBoards / boardPerPage);

    if (currentPage > lastPage) {
      this.setState({ currentPage: lastPage }, () => {
        this.fetchBoardList();
      });
    }

    if (showNewBoard) {
      return <NewBoard fetchBoardList={this.fetchBoardList} />;
    }

    const indexOfLastBoard = currentPage * boardPerPage;
    const indexOfFirstBoard = indexOfLastBoard - boardPerPage;
    const currentBoardList = boardList.slice(
      indexOfFirstBoard,
      indexOfLastBoard
    );

    const formattedBoardList = currentBoardList.map((board) => ({
      ...board,
      writeDate: this.formatDateString(board.writeDate),
    }));

    return (
      <div id="board">
        <BoardList boardList={formattedBoardList} />
        <Pagination
          total={totalBoards}
          itemsPerPage={boardPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange} // setCurrentPage 대신 onPageChange를 전달
        />
        <div id="new-write">
          <button onClick={this.handleToggleNewBoard}>글쓰기</button>
        </div>
      </div>
    );
  }
}

export default Board;
