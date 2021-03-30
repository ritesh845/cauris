import React from 'react';

import NavBar from './navbar';
import Footer from  './footer';

import { Modal, Button } from "react-bootstrap";
const axios = require('axios');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
}
export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: {},
            talents:{},
            show:false,
            id:'',
            name:'',
            about:'',
            status:'A',
            file:'',
            oldFile:'',
            facebookLink:'',
            instagramLink:'',
            snapchatLink:'',
            youtubeLink:'',

        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        this.get_talent();
    }
    get_talent = async () => {
        var talents = await axios.get('http://localhost:8081/talent',{headers:headers}).then(result => {
            this.setState({talents:result.data.data})

        }).catch(err => {
            window.location.href = '/login';
            localStorage.removeItem('accessToken');
        });
    }

    componentWillMount = async () => {
        var token = localStorage.getItem('accessToken');
        if(token === null){
            window.location.href = '/login';
        }
    }

    showModal = () => {
        this.setState({
            id:'',
            name:'',
            about:'',
            status:'A',
            instagramLink:'',
            facebookLink:'',
            snapchatLink:'',
            youtubeLink:'',
            oldFile:'',
            show:true,
        });
    };

    hideModal = () => {
        this.setState({show:false});
    };

    handleEdit = (value) => {

        this.setState({
            id:value.id,
            name:value.name,
            about:value.about,
            status:value.status,
            instagramLink:value.instagramLink,
            facebookLink:value.facebookLink,
            snapchatLink:value.snapchatLink,
            youtubeLink:value.youtubeLink,
            oldFile:value.img,
            show:true,
        });

    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.state.file)
        data.append('name', this.state.name)
        data.append('about', this.state.about)
        data.append('status', this.state.status)

        data.append('facebookLink', this.state.facebookLink)
        data.append('instagramLink', this.state.instagramLink)
        data.append('snapchatLink', this.state.snapchatLink)
        data.append('youtubeLink', this.state.youtubeLink)


        if(this.state.id ===''){
          var json = await axios.post('http://localhost:8081/talent/create',data,{headers:headers}).then((result) => {
                alert(result.data.message);
                return true;
            }).catch(err => {
                console.log(err)
                return  false;
               // window.location.href = '/login';
                //localStorage.removeItem('accessToken');
            });

        }else{
           data.append('oldFile',this.state.oldFile);
           var json =  await axios.put('http://localhost:8081/talent/update/'+this.state.id,data,{headers:headers}).then((result) => {
               alert(result.data.message);
                return true;
            }).catch(err => {
                console.log(err)
                return  false;
               // window.location.href = '/login';
                //localStorage.removeItem('accessToken');
            });

        }

        if(json){
            this.hideModal();
            await  this.get_talent();
        }
    }
    handleDelete = async (id) => {
        var json  = await axios.delete('http://localhost:8081/tutorial/delete/'+id,{headers:headers}).then(result => {
            alert(result.data.message);
            return true
        }).catch(err => {
            console.log(err)
            return  false;
        })

        if(json){
            await  this.get_talent();
        }
    }

    render(){
        return (
            <>
                <div className="back-inner ">
                    <NavBar />
                    <div className="main mt-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title">Talents
                                                <button className="btn btn-sm btn-primary pull-right" onClick={this.showModal}>Add Talent</button>
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered table-striped">
                                                <thead>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>About</th>
                                                    <th>Status</th>
                                                    <th>Social Media</th>
                                                    <th>Image</th>
                                                    <th>Action</th>
                                                </thead>
                                                <tbody>
                                                    {this.state.talents.length > 0 ?
                                                        this.state.talents.map((value,i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{i+1}</td>
                                                                    <td>{value.name}</td>
                                                                    <td>{value.about}</td>
                                                                    <td>{value.status === 'A' ? 'Active' : 'Pending'}</td>
                                                                    <td>
                                                                       {value.facebookLink !='' ? <a href={value.facebookLink}> <i className="fa fa-facebook mr-2"></i></a> : ''}

                                                                       {value.instagramLink !='' ?  <a href={value.instagramLink}><i className="fa fa-instagram mr-2"></i></a> : ''}
                                                                       {value.snapchatLink !='' ?  <a href={value.snapchatLink}><i className="fa fa-snapchat mr-2"></i></a> : ''}
                                                                       {value.youtubeLink !='' ? <a href={value.youtubeLink} > <i className="fa fa-youtube mr-2"></i></a> : ''}
                                                                    </td>
                                                                    <td><img src={'http://localhost:8081/'+value.img} width="50" /></td>
                                                                    <td>

                                                                        <button className="btn btn-sm btn-success mr-2" onClick={() => this.handleEdit(value)}>Edit</button>
                                                                        <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(value.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :<tr><td colSpan="7" className="text-center">Not Found</td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <Modal show={this.state.show} onHide={this.hideModal}>
                                <Modal.Header >
                                <Modal.Title>{this.state.id === '' ? 'Add' : 'Edit'} Talent</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <form name="talentForm" autoComplete="off" className="talentForm" onSubmit={this.handleSubmit} >
                                        <div className="form-group">
                                            <label>Talent Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Talent Name" name="name" value={this.state.name} onChange={(event) => this.setState({name : event.target.value})} required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label>About</label>
                                            <textarea className="form-control" name="about" cols="10" rows="7" onChange={(event) => {this.setState({about:event.target.value})}} required="required" defaultValue={this.state.about}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>

                                            <input type="file" className="form-control" name="file" onChange={(event) => this.setState({file : event.target.files[0]})} required={this.state.id === '' ? "required" : ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select className="form-control" onChange={(event) => {this.setState({status:event.target.value})}} name="status" value={this.state.status} required="required">
                                                <option value="">Select Status</option>
                                                <option value="A">Active</option>
                                                <option value="P">Pending</option>
                                            </select>

                                        </div>
                                        <div clasName="row">
                                            <div className="col-md-12">Social Media Link</div>
                                            <hr />
                                            <div className="form-group">
                                                <label>Facebook Link</label>
                                                <input type="text" className="form-control" placeholder="Enter Facebook Link" name="facebookLink" value={this.state.facebookLink} onChange={(event) => this.setState({facebookLink : event.target.value})}  />
                                            </div>
                                            <div className="form-group">
                                                <label>Instagram Link</label>
                                                <input type="text" className="form-control" placeholder="Enter Instagram Link" name="instagramLink" value={this.state.instagramLink} onChange={(event) => this.setState({instagramLink : event.target.value})}  />
                                            </div>
                                            <div className="form-group">
                                                <label>Snapchat Link</label>
                                                <input type="text" className="form-control" placeholder="Enter Snapchat Link" name="snapchatLink" value={this.state.snapchatLink} onChange={(event) => this.setState({snapchatLink : event.target.value})}  />
                                            </div>
                                            <div className="form-group">
                                                <label>Youtube Link</label>
                                                <input type="text" className="form-control" placeholder="Enter Youtube Link" name="youtubeLink" value={this.state.youtubeLink} onChange={(event) => this.setState({youtubeLink : event.target.value})}  />
                                            </div>
                                        </div>


                                        <input type="hidden" name='id' value={this.state.id} />
                                        <input type="hidden" name="oldFile" value={this.state.id} />
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideModal}>
                                    Close
                                </Button>

                                </Modal.Footer>
                            </Modal>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}
