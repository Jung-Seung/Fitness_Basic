import '../css/Footer.css';
import insta from '../images/instagram.png';
import blog from '../images/블로그2.png';

function Footer(){
    return(
        <div id='footer'>
            <p>&copy; 2023 Fitness Basic. All rights reserved.</p>
            <div id="footer-logo">
                <div id="insta">
                    <a href="https://www.instagram.com/fitness_basic_1st/">
                        <img src={insta} alt='insta'/>
                    </a>
                </div>
                <div id="blog">
                    <a href="https://blog.naver.com/fitb0730/223017011294">
                        <img src={blog} alt='blog'/>
                    </a>
                </div>
            </div>
            <div id="num">
                Number : 031-665-9555
            </div>
        </div>
    )
}

export default Footer;