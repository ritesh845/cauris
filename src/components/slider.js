import React from "react";

import {Carousel} from 'react-bootstrap'
const axios = require('axios');
class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state={
            talents:{}
        }
    }

    componentDidMount = async () => {
        this.get_talent();
    }
    get_talent = async () => {
        var talents = await axios.get('http://localhost:8081/get_talent').then(result => {
            this.setState({talents:result.data.data})

        }).catch(err => {
           console.log(err)
        });
    }
    openNav() {
        document.getElementById("myNav").style.width = "100%";

    }
    render() {
        return (
            <>
                <div className="slideshow-container ml-auto ">
                    <Carousel>
                         {this.state.talents.length > 0 ?
                            this.state.talents.map((value,i) => {
                                return (
                                    <Carousel.Item key={i}>
                                            <img
                                            className="d-block w-100"
                                            src={'http://localhost:8081/'+value.img}
                                            alt={i+ " slide"}
                                        />
                                    <Carousel.Caption>
                                        <h4 className="text-dark">{value.name}</h4>
                                    </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })
                            : '' }
                    </Carousel>
                        <span onClick={this.openNav} className="navtoggle">&#9776;</span>

                </div>

            </>
        )
    }

}

export default Slider;
