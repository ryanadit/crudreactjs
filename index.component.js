import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  ReactNotification  from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";
import Modal from 'react-bootstrap/Modal';
//import n12br from 'react-newline-to-break';
//import TableRow from './TableRow';
//import {NotificationContainer, NotifiactionManager } from 'react-notifications';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
      this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        persons: [],
        show: false,
        id:''
      
      };
    }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow(id) {
      this.setState({ 
        show: true,
        id:  id
      });
    }
  

    addNotification(){
      this.notificationDOMRef.current.addNotification({
        title :'danger',
        message : 'Berhasil dihapus',
        type : 'warning',
        insert : 'top',
        container :'top-center',
        animationIn : ['animated','fadeIn'],
        animationOut : ['animated','fadeOut'],
        dismiss :{duration : 10000 },
        dismissable : {click : true},
        width: 380
      });
    }
    // untuk menghapus data
  delete(id) {
    axios.get(`http://localhost:4000/business/delete/${id}`)
    .then(res => {this.addNotification();
    window.location.reload();
  })
  //window.location.reload()
  //window.location.reload().then(this.addNotification());
  //this.props.history.push('/index');//redirect ke halaman index   
  // this.addNotification()
}

  //fetch data dengan axios
    componentDidMount(){
      axios.get('http://localhost:4000/business')//ambil data dari API business
        // .then(response => {
        //   this.setState({ business: response.data });
            .then(res =>{
              const persons = res.data;
              this.setState({persons});
           
        })
        .catch(function (error) {
          console.log(error);
        })
    }


    // fetch data dari TableRow ke property business
    // tabRow(){
    //   return this.state.business.map(function(object, i){
    //       return <TableRow obj={object} key={i} />;
    //   });
    // }

    

    render() {
      return (
        <div>
          <h3 align="center">Employee List</h3>
          <ReactNotification ref={this.notificationDOMRef}/>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Business</th>
                <th>Employee Number</th>
                <th>Number Phone</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
                {this.state.persons.map(person => 
                <tr>
                <td>{person.person_name}</td>
                <td>{person.business_name}</td>
                <td>{person.business_gst_number}</td>
                <td>{person.number_phone}</td>
                <td>
                <Link to={"/edit/"+person._id} className="btn btn-primary">Edit</Link>&nbsp;
                <button onClick={() => this.handleShow(person._id)} className="btn btn-danger">Delete</button>
                </td>
                </tr>
                
                )}
              
            </tbody>
          </table>
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Menghapus</Modal.Title>
          </Modal.Header>
          <Modal.Body>Apakah data ingin dihapus?</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.handleClose}>
              Tidak
            </button>
            
            <button className="btn btn-primary" onClick={() => this.delete(this.state.id)}>
              Ya
            </button>
          
          </Modal.Footer>
        </Modal>
        </div>
      );
    }
  }