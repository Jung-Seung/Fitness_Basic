import React from 'react';
import '../../css/Gallery/TakeGallery.css';

const TakeGallery = (props) => {
  const handleClick = () => {
    props.onClick({
    //   no: props.no,
      title: props.title,
      img: props.img,
      writer: props.writer,
      writeDate: props.writeDate,
    });
  };

  return (
    <div id="takegallery" onClick={handleClick}>
      {/* <span>{props.no}</span> */}
      <span>{props.title}</span>
      <span>{props.img}</span>
      <span>{props.contents}</span>
      <span>{props.writer}{props.writeDate}</span>
    </div>
  );
};

export default TakeGallery;
