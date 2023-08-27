import React, { Component } from "react";

import classes from './Appointments.css'

import AnsweredComplaints from "./AsweredComplaints";
import NewComplaint from "./NewComplaint";
class DonorComplaint extends Component{
    state={
        route:"new"
    }



    render(){ 
       
        return (
         <div>
            <div className={classes.toolbarr}> 
                
                <input type="button" value="Moje zalbe"onClick={(event)=> this.setState({route:"mojezalbe"})} ></input>
                <input type="button" value="Nova zalba" onClick={(event)=> this.setState({route:"new"})}></input>
               
            </div> 
            
            {this.state.route==="mojezalbe"? <AnsweredComplaints></AnsweredComplaints>: null}
            {this.state.route==="new"? <NewComplaint></NewComplaint>: null}
           


         </div>
        )
    }
}
export default (DonorComplaint)