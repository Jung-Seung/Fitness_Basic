import React, { Component } from "react";
import "../../css/Board/BoardList.css";
import TakeGallery from "./TakeGallery.js";
import GalleryDetail from "./GalleryDetail.js";
import axios from "axios";

class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGallery: null,
      showGalleryDetail: false,
      galleryList: [], // 초기값을 빈 배열로 설정
    };
  }

  componentDidMount() {
    // 초기 galleryList 값을 props로부터 받아와 설정
    this.setState({
      galleryList: this.props.galleryList || [],
    });
  }

  handleGalleryClick = (gallery) => {
    this.setState({
      selectedGallery: gallery,
      showGalleryDetail: true,
    });
  };

  addGalleryInfo = async (title, file, contents, writer, writeDate) => {
    try {
      const formData = new FormData();
      formData.append("img", file);

      const uploadResponse = await axios.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { imgName } = uploadResponse.data;

      const response = await axios.post("/gallery", {
        title,
        img: imgName,
        contents,
        writer,
        writeDate,
      });
      console.log(response.data);
      
      // 추가한 갤러리 정보를 현재 갤러리 목록에 추가
      const newGallery = {
        no: response.data.no,
        title,
        img: imgName,
        contents,
        writer,
        writeDate,
      };
      this.setState((prevState) => ({
        galleryList: [...prevState.galleryList, newGallery],
      }));
    } catch (error) {
      console.error("Error adding gallery info:", error);
    }
  };

  handleBack = () => {
    this.setState({
      showGalleryDetail: false,
    });
  };

  handleDelete = async (galleryNo) => {
    try {
      // 게시글 삭제 요청
      await axios.delete(`/gallery/${galleryNo}`);
      
      // 삭제한 갤러리를 현재 갤러리 목록에서 제거
      this.setState((prevState) => ({
        galleryList: prevState.galleryList.filter((gallery) => gallery.no !== galleryNo),
      }));
    } catch (error) {
      console.error("Error deleting gallery:", error);
    }
  };

  handleUpdate = async (updatedGallery) => {
    try {
      // 게시글 수정 요청
      await axios.put(`/gallery/${updatedGallery.no}`, updatedGallery);
      
      // 수정한 갤러리 정보를 현재 갤러리 목록에 업데이트
      this.setState((prevState) => ({
        galleryList: prevState.galleryList.map((gallery) =>
          gallery.no === updatedGallery.no ? updatedGallery : gallery
        ),
      }));
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.galleryList !== this.props.galleryList) {
      this.setState({
        galleryList: this.props.galleryList || [], // galleryList를 업데이트
      });
    }
  }

  render() {
    const { galleryList, selectedGallery, showGalleryDetail } = this.state;
    const result = galleryList.map((data) => (
      <TakeGallery
        key={data.no}
        no={data.no}
        title={data.title}
        img={data.img}
        contents={data.contents}
        writer={data.writer}
        writeDate={data.writeDate}
        onClick={() => this.handleGalleryClick(data)}
      />
    ));

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

    return <div id="gallery-list">{result}</div>;
  }
}

export default GalleryList;
