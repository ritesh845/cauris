import logo from '../images/logo.png'
import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from './slider';
import {Link} from "react-router-dom";
AOS.init();

class  NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true
        }
    }

    componentDidMount = async () =>  {
        var pathname = window.location.pathname;
        if(pathname === '/'){
            await this.setState({show:true})
        }else{
            await this.setState({show:false})
        }
        // console.log(this.state.show);
    }

    openNav() {
        document.getElementById("myNav").style.width = "100%";

    }
    closeNav(){
        document.getElementById("myNav").style.width = "0%";

    }

    render() {
        return (
            <>
                <header className={"header " + (this.state.show === false ? 'sticky-top' : '')}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 col-xs-8 col-sm-8 col-xl-8 pt-4 pl-4">
                                <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
                            </div>
                            <div className="col-md-8 col-xs-3 col-sm-3 col-xl-3 pt-5 text-right pr-4">
                               { this.state.show === false ?  <span onClick={this.openNav} className="navtoggle1">&#9776;</span> : ''}
                            </div>
                        </div>
                    </div>
                    <div id="myNav" className={"overlay " + (this.state.show ===false ? 'overlay1' : '')}>
                        <span className="closebtn" onClick={this.closeNav}>&times;</span>
                        <div className="overlay-content" data-aos="fade-right" data-duration="3000">
                            <Link to="/talents">TALENTS</Link>
                            <Link to="/culture-urbaine">CULTURE URBAINE</Link>
                            <Link to="/engagements">ENGAGEMENTS</Link>
                            <Link to="/relation-press">RELATION PRESSE</Link>
                            <a href="#" className="mt-5">Nous contacter</a>
                        </div>
                    </div>
                </header>
                {this.state.show === true ? <Slider /> : ''}

            </>

        )
    }
}

export default NavBar;
