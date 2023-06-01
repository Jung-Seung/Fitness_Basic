import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Slide from "./Slide.js";
import openimg from "../images/open-img.PNG";
import SNBB from "../video/SNBB.mp4";
import axios from "axios";

function Home() {
  const [boardContents, setBoardContents] = useState([]);

  useEffect(() => {
    fetchBoardContents();
  }, []);

  const fetchBoardContents = async () => {
    try {
      const response = await axios.get("/board"); // 백엔드 API 엔드포인트에 맞게 수정
      setBoardContents(response.data.slice(0, 4)); // 상위 4개 데이터만 가져옴
    } catch (error) {
      console.error("Error fetching board contents:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div id="home">
      <div id="movie">
        <video controls width="525px" height="430px" autoPlay>
          <source src={SNBB} type="video/mp4"/>
        </video>
      </div>
      <div id="slide">
        <Slide />
      </div>
      <div id="open-time">
        <div id="open-header">· 운영시간</div>
        <div id="open-img">
          <img src={openimg} alt="opentime" />
        </div>
      </div>
      <div id="boardinfo">
        <div id="board-header">
          <a href="/board">· 게시판</a>
        </div>
        <div id="board-contents">
          <ul id="notice_list">
            {boardContents.map((content) => (
              <li key={content.no}>
                {content.title}
                <span>[{formatDate(content.writeDate)}]</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
