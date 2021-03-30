import React from 'react';

import NavBar from './navbar';
import Footer from  './footer';
const axios = require('axios');

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors:{},
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentWillMount = async () => {
        var token = localStorage.getItem('accessToken');
        if(token != null){
            window.location.href = '/dashboard';
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        var email    = event.target.email.value;
        var password = event.target.password.value;
        var errors = {}
        var json  = await axios.post('http://localhost:8081/login',{email:email,password:password}).then(result => {
            if(result.data.length !==0) {
                var accessToken = result.data.accesstoken;
                localStorage.setItem("accessToken", accessToken);
                this.setState({errors:{}})
                window.location.href = '/dashboard';
            }
        }).catch(error => {
            errors = {"email" :  "This credentails doesn't match our records."};
            this.setState({errors:errors})
        });
        console.log(Object.keys(this.state.errors).length)
    }

    render(){
        return(
            <>

               <div className="back-inner ">
               <NavBar />
                    <div className="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 m-auto">
                                        <div className="card bg-black">
                                            <div className="card-header border-0 text-center">
                                                <h4 className="text-white">Login</h4>
                                            </div>
                                            <div className="card-body">
                                                <form name="loginForm" autoComplete="off" className="loginForm" onSubmit={this.handleSubmit}>
                                                    <div className="row">
                                                        <div className="form-group col-md-6 m-auto">
                                                            <label className="text-white">Email Address</label>
                                                            <input name="email" className="form-control" type="email" placeholder="Enter Email Adress" />

                                                            {Object.keys(this.state.errors).length > 0 ?
                                                                <span className="text-danger mt-2">{this.state.errors.email}</span>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="form-group col-md-6 m-auto">
                                                            <label className="text-white">Password</label>
                                                            <input name="password" className="form-control" type="password" placeholder="Enter Password" />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-6 m-auto text-center">
                                                        <button className="btn btn-md bg-logo">Login</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                   </div>
                   <Footer />
               </div>



            </>
        )
    }
}
