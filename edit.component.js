import React, { Component } from 'react';
import axios from 'axios';
//import {ToastContainer,toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import  ReactNotification  from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onChangeNumberPhone = this.onChangeNumberPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:'',
      number_phone:''
    }
  }

   addNotification(){
    this.notificationDOMRef.current.addNotification({
      title :'success',
      message : 'Berhasil diupdate',
      type : 'success',
      insert : 'top',
      container :'top-center',
      animationIn : ['animated','fadeIn'],
      animationOut : ['animated','fadeOut'],
      dismiss :{duration : 2000},
      dismissable : {click : true},
      width: 380
    });
  }

  //ambil data dari database berdasarkan idnya
  componentDidMount() {
      axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name, 
                business_name: response.data.business_name,
                business_gst_number: response.data.business_gst_number,
                number_phone: response.data.number_phone
               });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }
  onChangeNumberPhone(e) {
    this.setState({
      number_phone: e.target.value
    })
  }
//ketika disubmit
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number,
      number_phone: this.state.number_phone
    };
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        //.then(res => {console.log(res.data);
          .then(res =>{ this.addNotification();
          //window.location.reload()
      });
      //window.location.reload();
      //this.props.history.push('/index/');
    
  }
 
  render() {
    return (
      
        <div style={{ marginTop: 10 }}>
        <ReactNotification ref={this.notificationDOMRef}/>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>Employee Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <label>Number Phone: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.number_phone}
                      onChange={this.onChangeNumberPhone}
                      />
                </div>
                <div className="form-group">
                    <button type="submit" 
                      value="Update Business" 
                      
                      className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
  }
}