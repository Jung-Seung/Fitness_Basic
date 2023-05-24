import '../css/Gallery.css';
import React, { Component } from 'react'
import GalleryList from './Gallery/GalleryList.js'
import Pagination from './Pagination.js'
import NewGallery from "./Gallery/NewGallery.js"
import axios from 'axios';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      galleryList: [],
      galleryPerPage: 6,
      currentPage: 1,
      showNewGallery: false
    }
  }

  componentDidMount() {
    this.fetchGalleryList();
  }

  fetchGallerydList = () => {
    const { galleryPerPage, currentPage } = this.state;
    const offset = (currentPage - 1) * galleryPerPage;
    const apiUrl = `/gallery?limit=${galleryPerPage}&offset=${offset}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ galleryList: response.data });
      })
      .catch((error) => {
        console.error("Error fetching gallery list:", error);
      });
  };

  handleToggleNewGallery = () => {
    this.setState((prevState) => ({
      showNewgallery: !prevState.showNewGallery,
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

    const totalGallerys = galleryList.length;
    const lastPage = Math.ceil(totalGallerys / galleryPerPage);

    if (currentPage > lastPage) {
      this.setState({ currentPage: lastPage }, () => {
        this.fetchGalleryList();
      });
    }

    if (showNewGallery) {
      return <NewGallery fetchGalleryList={this.fetchGalleryList} />;
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
        <GalleryList galleryList={formattedGalleryList} />
        <Pagination
          total={totalGallerys}
          itemsPerPage={galleryPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange} // setCurrentPage 대신 onPageChange를 전달
        />
        <div id="new-write">
          <button onClick={this.handleToggleNewGallery}>새 포스팅</button>
        </div>
      </div>
    );
  }
}

export default Gallery;