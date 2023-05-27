import '../css/Gallery.css';
import React, { Component } from 'react';
import GalleryList from './Gallery/GalleryList.js';
import Pagination from './Pagination.js';
import Input from './Gallery/Input.js';
import axios from 'axios';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryList: [],
      galleryPerPage: 6,
      currentPage: 1,
      showNewGallery: false
    };
  }

  componentDidMount() {
    this.fetchGalleryList();
  }

  fetchGalleryList = async () => {
    try{
      const { galleryPerPage, currentPage } = this.state;
      const offset = (currentPage - 1) * galleryPerPage;
      const apiUrl = `/gallery?limit=${galleryPerPage}&offset=${offset}`; // http://localhost:3000
      const response = await axios.get(apiUrl)
      this.setState({ galleryList: response.data });
    } catch(error) {
      console.error("갤러리 목록을 가져오는 중 오류 발생:", error);
    }
  }

  handleToggleNewGallery = () => {
    this.setState((prevState) => ({
      showNewGallery: !prevState.showNewGallery,
    }));
  };

  formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("ko-KR", options);
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.fetchGalleryList();
    });
  };

  render() {
    const { galleryList, galleryPerPage, currentPage, showNewGallery } = this.state;

    if (galleryList.length === 0) {
      return (
        <div id="gallery">
          <p>게시글이 없습니다.</p>
        </div>
      );
    }

    const totalGalleries = galleryList.length;
    const lastPage = Math.ceil(totalGalleries / galleryPerPage);

    if (currentPage > lastPage) {
      this.setState({ currentPage: lastPage }, () => {
        this.fetchGalleryList();
      });
    }

    if (showNewGallery) {
      return (
      <Input
      fetchGalleryList={this.fetchGalleryList}/>
      )
    }

    const indexOfLastGallery = currentPage * galleryPerPage;
    const indexOfFirstGallery = indexOfLastGallery - galleryPerPage;
    const currentGalleryList = galleryList.slice(
      indexOfFirstGallery,
      indexOfLastGallery
    );

    const formattedGalleryList = currentGalleryList.map((gallery) => ({
      ...gallery,
      writeDate: this.formatDateString(gallery.writeDate),
    }));

    return (
      <div id="gallery">
        <GalleryList 
        galleryList={formattedGalleryList} />
        <Pagination
          total={totalGalleries}
          itemsPerPage={galleryPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        <div id="new-write">
          <button onClick={this.handleToggleNewGallery}>새 포스팅</button>
        </div>
      </div>
    );
  }
}

export default Gallery;
