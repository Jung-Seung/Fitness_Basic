import { Component } from 'react';
import '../../css/Board/Pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pageClick = (page) => {
    this.props.onPageChange(page); // setCurrentPage 대신 onPageChange를 호출하도록 수정
  };

  prevPage = () => {
    const { currentPage } = this.props;
    const page = currentPage - 1;
    if (page < 1) {
      alert('이동불가');
    } else {
      this.props.onPageChange(page); // setCurrentPage 대신 onPageChange를 호출하도록 수정
    }
  };

  nextPage = () => {
    const { currentPage, total, itemsPerPage } = this.props;
    const page = currentPage + 1;
    const endPage = Math.ceil(total / itemsPerPage);
    if (page > endPage) {
      alert('이동불가');
    } else {
      this.props.onPageChange(page); // setCurrentPage 대신 onPageChange를 호출하도록 수정
    }
  };

  render() {
    const { total, itemsPerPage, currentPage } = this.props;
    const endPage = Math.ceil(total / itemsPerPage);
    let pageNumbers = [];
    for (let i = 1; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    const result = pageNumbers.map((page) => (
      <span
        id="page"
        className={currentPage === page ? 'active' : ''}
        onClick={() => this.pageClick(page)}
      >
        {page}
      </span>
    ));

    return (
      <div id="pagination">
        <div id="pagination-inner">
          <span id="page" onClick={this.prevPage}>
            &lt;
          </span>
          {result}
          <span id="page" onClick={this.nextPage}>
            &gt;
          </span>
        </div>
      </div>
    );
  }
}

export default Pagination;