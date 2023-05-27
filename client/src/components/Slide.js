import '../css/Slide.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fitness from '../images/fitness basic.jpg';
import price from '../images/Price.png';
import into_1 from '../images/into_1.jpg';
// import next from '../images/next.svg';
// import prev from '../images/prev.svg';

function Slide(){
    const settings={
        // nextArrow:(
        //     <div id='next'>
        //         <img src={next} alt='next'/>
        //     </div>
        // ),
        // prevArrow:(
        //     <div id='prev'>
        //         <img src={prev} alt='prev'/>
        //     </div>
        // ),
        dots:true,
        autoplay:true,
        autoplaySpeed:4000,
        speed:300,
        slidesToShow:1,
        slidesToScroll:1
    }
    const myImgList=[fitness,price,into_1]
    const result=myImgList.map(
        (data)=>(<div id='my-slide-element'>
            <img src={data} alt='data'/>
        </div>)
    )
    return(
        <div id='slide1'>
            <Slider {...settings}>
                {result}
            </Slider>
        </div>
    )
}

export default Slide;