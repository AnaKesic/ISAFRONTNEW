import React,{ Component } from "react";
import classes from './AnsweredComplaints.css'
import axios from 'axios'

class AnsweredAdmin extends Component{
    state={
       complaints:[]

    }
           
    componentDidMount() {
        axios.get('http://localhost:8090/api/user/getAdminComplaints',{
          params:{
           "email": localStorage.userId}})
          .then(res => {
             const apps=res.data;
             this.setState({complaints:apps})  
             console.log(this.state)
  
          });
      } 


    render(){
        const {complaints}=this.state;
        return(

            <div className={classes.container}>
                {complaints.map(comp=>{
                   const {subject, text , answer}=comp;
            return(
             <div className={classes.card}> 
             <div className={classes.header}> {subject}</div>
             <label className={classes.minilabel}> Complaint:</label> 
             <div className={classes.complaint}>
               <label className={classes.text}> {text}</label>
                </div>
             <label className={classes.minilabel}> Answer:</label> 
             <div className={classes.complaint}>{answer}</div>
              </div>

            
                 );} )}
              </div>
        )

       
    }
}
export default (AnsweredAdmin)