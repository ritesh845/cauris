import React from 'react';
import NavBar from './navbar';
import Footer from  './footer';
const axios = require('axios');


export default class  Talent extends React.Component {
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
        console.log(this.state.talents)
    }

    render(){
        return  (
            <div className="back-inner">
                <NavBar />
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <h5 className="page-title font-weight-bold ml-5">TOUS NOS TALENTS</h5>
                                </div>
                                <div className="col-md-3 pt-3">
                                    <ul className="list">
                                        {this.state.talents.length > 0 ?
                                            this.state.talents.map((value,i) => {
                                            return (
                                                <li key={i}><a href={"#"+value.name+"_"+i}>{value.name}</a></li>
                                            )
                                        })
                                        : ''
                                    }
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                {this.state.talents.length > 0 ?
                                    this.state.talents.map((value,i) => {
                                    return (
                                        <div className={"row " + (i === 0 ? ''  : "post") + (i === (this.state.talents.length-1) ? " last-post" : "") } key={i}>
                                            <div className="col-md-3" id={value.name+"_"+i}>
                                                <span className="talent-name">@ {value.name}</span>
                                            </div>
                                            <div className="col-md-9 text-right">
                                                <span className="social-count mr-3"><a href={value.instagramLink !='' ? value.instagramLink : '#'} target="_blank"><i className="fa fa-instagram"></i></a></span>

                                                <span className="social-count mr-3"><a href={value.facebookLink !='' ? value.facebookLink : '#'} target="_blank"><i className="fa fa-facebook"></i></a></span>

                                                <span className="social-count mr-3"><a href={value.snapchatLink !='' ? value.snapchatLink : '#'} target="_blank"><i className="fa fa-snapchat"></i></a></span>

                                                <span className="social-count mr-3"><a href={value.youtubeLink !='' ? value.youtubeLink : '#'} target="_blank"><i className="fa fa-youtube"></i></a></span>

                                            </div>
                                            <div className="col-md-12">
                                            <img  className="post-img" alt={value.name} src={'http://localhost:8081/'+value.img} />
                                                <span className="post-content" data-aos="fade-left" data-aos-duration="1000">

                                                    <h3 className="font-weight-bold mb-3" data-aos="fade-right" data-aos-duration="1000">{value.name}</h3>

                                                    <p className="post-p" data-aos="fade-left" data-aos-duration="1000">{value.about}
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    )

                            })
                            : ''
                        }
                                </div>

                            </div>
                            <div className="row">

                            </div>
                        </div>
                    </div>

                <Footer />
            </div>
        )
    }
}
