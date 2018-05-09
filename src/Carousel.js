import React, {Component} from 'react'
import Slide from './Slide'
import throttle from 'lodash.throttle'

class Carousel extends Component{
    constructor(props){
        super(props)
        this.handleLeftNav = this.handleLeftNav.bind(this)
        this.onResize = this.onResize.bind(this)
        this.trotlleResize = throttle(this.onResize, 250) //using loaddash library to throttle when resizing the window
        this.state = {
            numOfSlidesToScroll : 4
        }
    }
    //onresize of screen, only slide the number of slides that can fit in the screen
    onResize(){
        this.checkNumberOfSlidesToScroll()
    }
    componentDidMount(){
        window.addEventListener('resize', this.trotlleResize)
    }
    componentWillUnMount(){
        window.removeEventListener('resize', this.trotlleResize)
    }
    //if the window size is smaller then 900 px, then only show 2 slides
    //if the window size is bigger then 900 px, then show 4 slides to slides 
    checkNumberOfSlidesToScroll(){
        var numOfSlidesToScroll; 
        if( window.innerWidth <= 900 ){
            numOfSlidesToScroll = 2
        } else {
            numOfSlidesToScroll = 4
        }
        if(this.state.numOfSlidesToScroll !== numOfSlidesToScroll){
            this.setState({
                numOfSlidesToScroll: numOfSlidesToScroll
            })
        }
    }
    //on left arrow click, slide carouselViewport.scrollLeft + (numOfSlidesToScroll * widthOfSlide)
    handleLeftNav(e){
        const {carouselViewport} = this.refs
        var numOfSlidesToScroll = this.state.numOfSlidesToScroll
        var widthOfSlide = 167
        var newPosition = carouselViewport.scrollLeft + (numOfSlidesToScroll * widthOfSlide)
        carouselViewport.scrollLeft = newPosition
    }
    //on left arrow click, carouselViewport.scrollLeft - (numOfSlidesToScroll * widthOfSlide)
    handleRightNav(e){
        const {carouselViewport} = this.refs
        var numOfSlidesToScroll = this.state.numOfSlidesToScroll
        var widthOfSlide = 167
        var newPosition = carouselViewport.scrollLeft - (numOfSlidesToScroll * widthOfSlide)
        carouselViewport.scrollLeft = newPosition
    }

    //render slides from array given of images
    renderSlides(){
        let imagesArr = [{url: 'google.com', name: 'image1'}, 
                        {url: 'yahoo.com', name: 'image2'}]

    //iterate array and crate a new slide component with properties of name, and url
        return imagesArr.map((state) =>{
            return (<Slide name = { state.name } src = { state.url } />)   
        })
    }
    
    render(){
        return (
            <div className="carousel-container">
                <button className="carousel-nav carousel-left-nav" onClick={this.handleLeftNav} >&#60;</button>
                    <div className="carousel-viewport" ref="carouselViewPort">
                        {this.renderSlides()}
                    </div>
                <button className="carousel-nav carousel-right-nav" onClick={this.handleRightNav}>&#62;</button>
            </div>
        );
    }
}
export default Carousel;
