import React,{ Component } from "react";
import classes from './AllAppointments.css'
import axios from 'axios'
import { format, parse } from 'date-fns';

class HistoryOfAppointments extends Component{
    state={
       appointments:[],
       selected:""

    }
           
    componentDidMount() {
        axios.get('http://localhost:8090/api/user/getHistoryOfDonorAppointments',{
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
               var filter="";
               if(this.state.selected==="Sort by date newer first"){filter="date_b_l"}
               if(this.state.selected==="Sort by date old first"){filter="date_l_b"}
               if(this.state.selected==="Sort by price bigger first"){filter="price_b_l"}
               if(this.state.selected==="Sort by price lower first"){filter="price_l_b"}
               if(this.state.selected==="Sort by duration shorter first"){filter="duration_l_b"}
               if(this.state.selected==="Sort by duration longer first"){filter="duration_b_l"}
               if(this.state.selected==="Sort by blood bank a-z"){filter="bb_a_z"}
               if(this.state.selected==="Sort by blood bank z-a"){filter="bb_z_a"}
               if(this.state.selected==="Sort by doctor a-z"){filter="doctor_a_z"}
               if(this.state.selected==="Sort by doctor z-a"){filter="doctor_z_a"}
             
               axios.get('http://localhost:8090/api/user/sortHistoryOfDonorAppointments',
               {
                params:{
                    email:localStorage.userId,
                    filter:filter
                }
               }).then(res => {
                const apps=res.data;
                this.setState({appointments:apps})  
                console.log(this.state)
     
             });
            }
        
       
    };

    render(){
        const { appointments} = this.state;
        const options=["","Sort by date newer first", "Sort by date old first", "Sort by price lower first","Sort by price bigger first",
                       "Sort by duration shorter first", "Sort by duration longer first","Sort by blood bank a-z", "Sort by blood bank z-a", 
                       "Sort by doctor a-z", "Sort by doctor z-a"]
               
                       
        return(    
            <div>
           
               <React.Fragment>
                 
             
                <div className={classes.olicycontainer}>
                <div className={classes.selectt}>
                   <label>Sort appointments</label>
                 <select onChange={(event) =>
                this.handleSelectChange(event)}>
                {options.map((value) => (
                  <option value={value} key={value} on>
                    {value}
                  </option>
                ))}
              </select></div>
            
                        
                  <table  className={classes.policytable}>
                        <tr className={classes.headings}>
                            <th className={classes.heading}>Banka krvi</th>
                            <th className={classes.heading}>Datum</th>
                            <th className={classes.heading}>Vreme</th>
                            <th className={classes.heading}>Predvidjeno trajanje</th>
                            <th className={classes.heading}>Doktor</th>
                            <th className={classes.heading}>Cena</th>
                        </tr>
                            
               {appointments.map(bank => {
                      const { id,doctor, duration, time, price, bloodBank}=bank;
                      var d2=new Date(time);
                      const date= format(d2,"dd.MM.yyyy");
                      const timeonly=format(d2,"hh:mm");

                 return(
                                <tr key={id} className={classes.policy}>
                                    <td>{bloodBank}</td>
                                    <td>{date}</td>
                                    <td>{timeonly}</td>
                                    <td>{duration} min</td>
                                    <td>{doctor}</td>
                                    <td>{price}</td>
                                </tr>
                            
                 )
               })}
                        
                    </table>
                
                    </div>
                       



           
               </React.Fragment>
               </div>
        )

       
    }
}
export default (HistoryOfAppointments)