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
                경기 평택시 정암로 55 서정아트타워2차 3층
                <div id="add-up">
                    상세<br/>
                    경기도 평택시 이충동 445-3 / 정암로 55 입니다.<br/>
                    1호선 서정리역 하차 후 택시정류장 앞으로 직진 600m 정도 하시면 됩니다.<br/>
                    기아자동차 골목 굿모닝마트 옆 오피스텔 건물 3층입니다.
                </div>
            </div>
        </div>
    )
}

export default Contact;