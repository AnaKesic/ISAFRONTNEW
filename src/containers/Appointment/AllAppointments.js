import React, { Component } from "react";
import axios from 'axios'
import { format, parse } from 'date-fns';
import classes from './AllAppointments.css'
import ErrorModal from '../../components/Modal/Modal'
class AllAppointments extends Component{
    state={
        appoints:[],
        error:null,
        title:'',
        message:''
     }

     componentDidMount() {
        const url = new URL(window.location.href);
        const id = url.pathname.split('/')[1]; // 
        console.log(id)
      axios.get('http://localhost:8090/api/bloodbank/getAllAppointments', {
         params: {
             Id: id
          }})
        .then(res => {
            const apps=res.data;
           this.setState({appoints:apps})
           //this.state.flights=res.data;
           console.log(this.state)
        });
    }

      handleSheduleAppointment = (id) => {
          
        var dto={
            appointmentId:id,
            donorEmail: localStorage.userId
        }
        axios.put('http://localhost:8090/api/appointment/sheduleAppointment',dto)
        .then(res => {
           console.log(res.data)
           window.location.href="http://localhost:3000/sheduledAppointments"
        })
        .catch(err => {
            console.log(err.response.data);
           
            
            this.setState({
                error:true,
                title: 'Upozorenje',
                message: err.response.data

              });
          
            
        });

        }
    
        errorHandler = () => {
           this.setState({error:null})
          };
          
    





    render(){
        const { appoints} = this.state;
       const {error}=this.state;
               
                       
        return(    

           
               <section>
                 { error===true && <ErrorModal title={this.state.title} message={this.state.message} onClose={this.errorHandler} /> }
              
                <div className={classes.olicycontainer}>
            
                        
                  <table  className={classes.policytable}>
                        <tr className={classes.headings}>
                            <th className={classes.heading}>Datum</th>
                            <th className={classes.heading}>Vreme</th>
                            <th className={classes.heading}>Trajanje</th>
                            <th className={classes.heading}>Doktor</th>
                            <th className={classes.heading}>Zakažite termin</th>
                        </tr>
                            
               {appoints.map(bank => {
                      const { id,doctor, duration, time}=bank;
                      var d2=new Date(time);
                      const date= format(d2,"dd.MM.yyyy");
                      const timeonly=format(d2,"hh:mm");

                 return(
                                <tr key={id} className={classes.policy}>
                                    <td>{date}</td>
                                    <td>{timeonly}</td>
                                    <td>{duration} min</td>
                                    <td>{doctor.name} {doctor.surname}</td>
                                    <td><button className={classes.button}onClick={() => this.handleSheduleAppointment(id)}>Zakažite</button></td>
                                </tr>
                            
                 )
               })}
                        
                    </table>
                
                    </div>
                       



            
               </section>
        );}
}
export default (AllAppointments)
