import '../css/Header.css';
import logo from '../images/logo.png';

function Header(){
    return(
        <div id='header'>
            <div id='logo'>
                <a href="/">
                    <img src={logo} alt='로고'/>
                </a>
            </div>
            <nav id='nav'>
                <ul id='btn'>
                    <li>
                        <a href='/board'>
                            게시판
                        </a>
                    </li>
                    <li>
                        <a href='/teach'>
                            강사진
                        </a>
                    </li>
                    <li>
                        <a href='/gallery'>
                            갤러리
                        </a>
                    </li>
                    <li>
                        <a href='/contact'>
                            오시는길
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;