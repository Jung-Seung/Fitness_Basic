import '../css/Contact.css';
import { useEffect } from 'react';
import Kakaomap from './Contact/Kakaomap.js';

function Contact(){
    useEffect(() => {
    },[])

    return(
        <div id='contact'>
            <div id="kakao">
                <Kakaomap/>
            </div>
            <div id="add">
            · 경기 평택시 정암로 55 서정아트타워2차 3층
                <div id="add-up">
                • 1:1PT/다이어트/시합준비/바디프로필<br/>
                <br/>
                • 송탄300평규모 프리미엄퍼블릭센터 머신 최다보유<br/>
                <br/>
                • 운영진 현역 선수 및 트레이너<br/>
                <br/>
                • 평택 최다 PT 수요량<br/>
                <br/>
                <br/>
                <br/>
                <br/>
                📞 전화 문의 031-665-9555<br/>
                🗣 카카오톡 문의<br/>
                <a href="https://open.kakao.com/o/spYAnpCd">open.kakao.com/o/spYAnpCd</a><br/>
                👉 플러스친구 '휘트니스 베이직'
                </div>
            </div>
        </div>
    )
}

export default Contact;