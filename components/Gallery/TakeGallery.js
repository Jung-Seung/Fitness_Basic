import React from 'react';
import '../../css/Gallery/TakeGallery.css';

const TakeGallery = (props) => {
  const handleClick = () => {
    const { no, title, img, contents, writer, writeDate } = props;
    const galleryData = {
      no,
      title,
      img,
      contents,
      writer,
      writeDate
    };
    props.onClick(galleryData);
  };

  const imgSrc = props.img ? `/uploads/gallery/${props.img}` : '';

  return (
    <div id="takegallery" onClick={handleClick}>
      <div>{props.title}</div>
      <div><img src={imgSrc} alt="Gallery" /></div>
      <div>{props.contents}</div>
      <div>{props.writer} {props.writeDate}</div>
    </div>
  );
};

export default TakeGallery;
