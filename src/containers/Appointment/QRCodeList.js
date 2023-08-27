import React, { Component } from "react";
import axios from 'axios'
import classes from './qr.css'

import QRCode from "react-qr-code";
class QRCodeList extends Component{

    state={
        selected:"",
        appointments:[]
    }
    componentDidMount() {
        axios.get('http://localhost:8090/api/user/getAllDonorAppointments',{
          params:{
           "email": localStorage.userId}})
          .then(res => {
             const apps=res.data;
             this.setState({appointments:apps})  
             console.log(this.state)
  
          });
      } 

      handleSelectChange=(event)=>
      {
           this.setState({selected:event.target.value}, () => {
              // This callback will be executed after the state is updated
              console.log(this.state.selected);
              this.callFilter();
          
      });}

      callFilter=()=>{
        if (this.state.selected !== "") {
              
               axios.get('http://localhost:8090/api/user/sortQRAppointments',
               {
                params:{
                    email:localStorage.userId,
                    filter:this.state.selected
                }
               }).then(res => {
                const apps=res.data;
                this.setState({appointments:apps})  
                console.log(this.state)
     
             });
            }
        }
        
  render(){
    const {appointments}=this.state;

     return(

        <div>
            <label>Sort and filter QR codes</label>
            <select onChange={(event) =>
                this.handleSelectChange(event)}>
                <option value="">  </option>
                <option value="date_b_l">sort by date first new</option>
                <option value="date_l_b">sort by date first old</option>
                <option value="n">Filter new</option>
                <option value="c">Filter declined</option>
                <option value="f">Filter finished</option>
            </select>
             {appointments.map(app=>{
                      const {QRCode} =app;
                      return(
                        <div>
                            <img src={`data:image/jpeg;base64,${QRCode}`} />
                      </div>
             )})}
            
                   
            </div>
        
     )

  }

}
export default(QRCodeList)