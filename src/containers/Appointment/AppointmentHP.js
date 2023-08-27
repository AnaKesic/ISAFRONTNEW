import React, { Component } from "react";
import AllAppointments from "./AllAppointments";
import HistoryAppointment from "./HistoryAppointment";
import SheduledAppointments from "./SheduledAppointments";
import QRCodeList from "./QRCodeList";
import classes from './Appointments.css'
import HistoryOfAppointments from "./HistoryOfAppointments";

class AppointmentHP extends Component{
    state={
        route:"new"
    }



    render(){ 
       
        return (
         <div>
            <div className={classes.toolbarr}> 
                
                <input type="button" value="Istorija poseta"onClick={(event)=> this.setState({route:"history"})} ></input>
                <input type="button" value="Zakazani termini" onClick={(event)=> this.setState({route:"new"})}></input>
                <input type="button" value="QR kodovi termina" onClick={(event)=> this.setState({route:"qr"})}></input>
            </div> 
            
            {this.state.route==="history"? <HistoryOfAppointments></HistoryOfAppointments>: null}
            {this.state.route==="new"? <SheduledAppointments></SheduledAppointments>: null}
            {this.state.route==="qr"? <QRCodeList></QRCodeList>: null}


         </div>
        )
    }
}
export default (AppointmentHP)