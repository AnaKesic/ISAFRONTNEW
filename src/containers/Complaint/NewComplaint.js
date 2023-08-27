import React,{ Component } from "react";
import classes from './Complaint.css'
import axios from 'axios'
class NewComplaint extends Component{

    state={
        type:"",
        text:"",
        noCombokbox:true,
        error:false,
        stafff :[],
        bloodBanks:[],
        lists: null,
        error:false,
        bloodBankId:"",
        staffEmail:""
        

    }
   
    componentDidMount() {
      axios.get('http://localhost:8090/api/user/getAllAllowed',{
        params:{
         "email": localStorage.userId}})
        
        .then(res => {
            const apps=res.data;
           this.setState({lists:apps})
           const {bloodBank,staff}=this.state.lists;
           this.setState({bloodBanks:bloodBank});
           this.setState({stafff:staff});
           console.log(this.state.stafff,this.state.bloodBanks)

           //this.state.flights=res.data;
           console.log(this.state)
        });
    } 
    handleSelectChange=(event)=>
    {
        const { type } = this.state;
        const selectedValue = event.target.value;
    
        if (type === "Staff") {
            this.setState({
                staffEmail: selectedValue,
                bloodBankId: "",
            });
        } else {
            this.setState({
                staffEmail: "",
                bloodBankId: selectedValue,
            });
        }
    };

    handleSubmiit =(event)=>{
       if(this.state.type==="" || this.statetext===""|| (this.state.bloodBankId===""&& this.state.staffEmail==="")|| (this.state.bloodBankId!==""&& this.state.staffEmail!=="")){
              this.setState({error:true})
        }
        else{
        event.preventDefault(); 
        console.log("Button clicked");
        console.log("Text:", this.state.text);
        console.log("BloodBankId:", this.state.bloodBankId);
        console.log("StaffEmail:", this.state.staffEmail);
    
        var object={
            text:this.state.text,
            bloodBankId:this.state.bloodBankId,
            staffEmail:this.state.staffEmail,
            donorEmail:localStorage.userId
        }
       axios.post('http://localhost:8090/api/complaint/addNew', object)
        .then(res=>{
                     console.log(res.data)
                     window.location.href="http://localhost:3000/answeredcomplaints"
        })
        .catch(error => {
            console.error("Error submitting complaint:", error);
        });
        }
    }

    handleChange=(event)=> {
        this.setState({text: event.target.value});
      }

render(){
    const cars = ["Saab", "Volvo", "BMW"];
    const {stafff}=this.state
    const {bloodBanks}=this.state;
    const {type}=this.state;
    return(
        <div className={classes.card}> 
            <form>
                <h2> Write new complaint</h2>
    <div >
    <label>I want to write complaint about:</label>
    <label>
            <input
               
                type="radio"
                value="BloodBank"
                checked={this.state.type === 'BloodBank'}
                onChange={(event) =>
                    this.setState((prevState) => ({
                        ...prevState,
                        type: 'BloodBank',
                        noCombokbox: false,
                    }))
                }
            />
           Bloodbank</label>
       
       
       
        <label>
            <input     
                type="radio"
                value="Staff"
                checked={this.state.type === 'Staff'}
                onChange={(event) =>
                    this.setState((prevState) => ({
                        ...prevState,
                        type: 'Staff',
                        noCombokbox: false,
                    }))
                }
            />
            Staff</label>
           
       
   </div>
   {this.state.noCombokbox?<div className={classes.divic}></div>:
   <div>
                       <label disabled={this.state.noCombokbox}>Please choose which {this.state.type}</label>
                        <select disabled={this.state.noCombokbox} onChange={(event) =>
        this.handleSelectChange(event)
        } >
                           <option value="">Select an option</option> 
                        {(type==='Staff')?
                                  stafff.map(item =>
                                 {
                                        const {fullName, email} =item;
                                        return(
                                            
                                            <option value={email} key={fullName}>{fullName}</option>
                                        )
                                 }
                                 )
                                
                                :
                                bloodBanks.map(item =>
                                    {
                                           const {name, Id} =item;
                                           return(
                                               <option value={Id} key={name}>{name}</option>
                                           )
                                    }
                                    )
}
                        </select> 
                        
                                
                        </div>
                  }
                        <div>
                        <textarea value={this.state.text} onChange={(event) => this.handleChange(event)} placeholder="Write your complaints here..."></textarea>

                        
                        </div>
                        {(this.state.error)? <div error> All field have to be filed out</div>:
                        <div></div>}
                        <div>
                            <input type="button"  disabled={
                            this.state.type === "" ||
                            this.state.text === "" ||
                            (this.state.bloodBankId === "" && this.state.staffEmail === "") ||
                            (this.state.bloodBankId !== "" && this.state.staffEmail !== "")
                        } onClick={(event) => this.handleSubmiit(event)} value="Click Me" />
                        </div>

            </form>
            
        </div>
    )
}

}
export default (NewComplaint)