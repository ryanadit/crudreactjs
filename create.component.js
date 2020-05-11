import React, { Component } from 'react';
import axios from 'axios';//library http untuk post dan get
import  ReactNotification  from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";

export default class Create extends Component {
    constructor(props) {
        super(props);
        //set data yang akan diinputkan
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
        this.onChangeNumberPhone = this.onChangeNumberPhone.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    
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
          message : 'Berhasil disimpan',
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

    //jika disubmit maka akan dijalankan
      onSubmit(e) {
        e.preventDefault();
        const obj = {
            //input data yang akan dimasukkan ke database
          person_name: this.state.person_name,
          business_name: this.state.business_name,
          business_gst_number: this.state.business_gst_number,
          number_phone: this.state.number_phone
        };
        axios.post('http://localhost:4000/business/add', obj)
            //.then(res => console.log(res.data));
            .then(res =>{ this.addNotification(); });
            
        // set data sesudah diinputkan
        this.setState({
          person_name: '',
          business_name: '',
          business_gst_number: '',
          number_phone:''
        })
      }

      render() {
        return (
            <div style={{ marginTop: 10 }}>
            <ReactNotification ref={this.notificationDOMRef}/>
                <h3>Add New Business</h3>
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
                        <label>Phone Number: </label>
                        <input type="text" 
                          className="form-control"
                          value={this.state.number_phone}
                          onChange={this.onChangeNumberPhone}
                          />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Business" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
      }
    }