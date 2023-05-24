import React, { Component } from "react";
import '../../css/Board/BoardList.css';
import TakeGallery from "./TakeGallery.js";
import GalleryDetail from "./GalleryDetail.js";

class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGallery: null,
      showGalleryDetail: false,
      galleryList: props.galleryList || [],
    };
  }

  handleGalleryClick = (gallery) => {
    this.setState({
      selectedGallery: gallery,
      showGalleryDetail: true,
    });
  };

  handleBack = () => {
    this.setState({
      showGalleryDetail: false,
    });
  };

  handleDelete = (galleryNo) => {
    // 게시글 삭제 후 목록 갱신
    this.setState((prevState) => ({
        galleryList: prevState.galleryList.filter((gallery) => gallery.no !== galleryNo),
    }));
  };

  handleUpdate = (updatedGallery) => {
    // 게시글 수정 후 목록 갱신
    this.setState((prevState) => ({
        galleryList: prevState.galleryList.map((gallery) =>
        gallery.no === updatedGallery.no ? updatedGallery : gallery
      ),
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.galleryList !== this.props.galleryList) {
      this.setState({
        galleryList: this.props.galleryList,
      });
    }
  }

  render() {
    const { galleryList, selectedGallery, showGalleryDetail } = this.state;

    if (showGalleryDetail) {
      return (
        <div id="gallery-list">
          <GalleryDetail
            gallery={selectedGallery}
            onBack={this.handleBack}
            onDelete={this.handleDelete}
            onUpdate={this.handleUpdate}
          />
        </div>
      );
    }

    const result = galleryList.map((data) => (
      <TakeGallery
        key={data.no}
        no={data.no}
        title={data.title}
        writer={data.writer}
        writeDate={data.writeDate}
        onClick={() => this.handleBoardClick(data)}
      />
    ));

    return (
      <div id="gallery-list">
        <div id="list-header">
        <TakeGallery
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

export default GalleryList;
