import React, { Component } from "react";
import axios from 'axios'
import { format, parse } from 'date-fns';
import classes from './AllAppointments.css'
class SheduledAppointments extends Component{
    state={
        appoints:[]
     }

     componentDidMount() {
        axios.get('http://localhost:8090/api/user/getSheduledDonorAppointments', {
         params: {
             email: localStorage.userId
          }})
        .then(res => {
            const apps=res.data;
           this.setState({appoints:apps})
           //this.state.flights=res.data;
           console.log(this.state)
        });
    }

      handleCancelAppointment = (id) => {
        var dto={
            appointmentId:id,
            donorEmail: localStorage.userId
        }
        axios.put('http://localhost:8090/api/appointment/cancelAppointment',dto)
        .then(res => {
           console.log(res.data)
           window.location.reload(false);
        });

        }

    





    render(){
        const { appoints} = this.state;
       
               
                       
        return(    
               <React.Fragment>
                <div className={classes.olicycontainer}>
            
                        
                  <table  className={classes.policytable}>
                        <tr className={classes.headings}>
                            <th className={classes.heading}>Banka krvi</th>
                            <th className={classes.heading}>Doktor</th>
                            <th className={classes.heading}>Datum</th>
                            <th className={classes.heading}>Vreme</th>
                            <th className={classes.heading}>Trajanje</th>
                            <th className={classes.heading}>Cena</th> 
                            <th className={classes.heading}>Otkazi </th>
                        </tr>
                            
               {appoints.map(bank => {
                      const { id,doctor, bloodBank, duration, time, price}=bank;
                      var d2=new Date(time);
                      const date= format(d2,"dd.MM.yyyy");
                      const timeonly=format(d2,"hh:mm");

                 return(
                                <tr key={id} className={classes.policy}>
                                    <td>{bloodBank}</td>
                                    <td>{doctor.name} {doctor.surname}</td>
                                    <td>{date}</td>
                                    <td>{timeonly}</td>
                                    <td>{duration} min</td>
                                    <td>{price}</td>
                                    <td><button onClick={() => this.handleCancelAppointment(id)}>Otkazi</button></td>
                                </tr>
                            
                 )
               })}
                        
                    </table>
                
                    </div>
                       



           
               </React.Fragment>
        );}
}
export default (SheduledAppointments)
