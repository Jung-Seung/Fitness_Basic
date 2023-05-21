import React from 'react';
import '../../css/Board/TakeBoard.css';

const TakeBoard = (props) => {
  const handleClick = () => {
    props.onClick({
      no: props.no,
      title: props.title,
      writer: props.writer,
      writeDate: props.writeDate,
    });
  };

  return (
    <div id="takeboard" onClick={handleClick}>
      {/* <span>{props.no}</span> */}
      <span>{props.title}</span>
      <span>{props.writer}</span>
      <span>{props.writeDate}</span>
    </div>
  );
};

export default TakeBoard;
