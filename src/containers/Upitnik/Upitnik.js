import React,{useState,useEffect}from 'react';
import axios from 'axios';
import classes from './Upitnik.css'


const Upitnik = ()=>{
    const[one, setOne]=useState('');
    const [disabled, setDisabled] = useState(true);
    const[ques, setQues]= useState([]);  

    useEffect(() => {
      axios.get('http://localhost:8090/api/questionnaire/getText')
        .then(res => {
          setQues(res.data);
          console.log(ques);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []); 
  
    useEffect(() => {
      console.log(ques); // Log the updated state when it changes
    }, [ques]); // Add ques to the dependency array
    
 



    const initialState = {
      state1: '',
      state2:'',
      state3:'',
      state4: '',
      state5:'',
      state6:'',
      state7: '',
      state8:'',
      state9:'',
      state10: '',
      state11:'',
      state12:'',
      state13:'',
      state14:'',
      state15: '',
      state16:'',
      state17:'',
      state18: '',
      state19:'',
      state20:'',
      state21: '',
      state22:'',
      state23:'',
      state24:'',
      state25: '',
      state26:'',
      state27:'',
      state28: '',
      state29:'',
      state30:'',
      state31: '',
      state32:'',
      state33:'',
      state34:'',
      state35: '',
      state36:'',
      state37:'',
      state38: '',
      state39:''
     
    }; 
  
    const [states, setStates] = useState(initialState);
   

   
const handleChange= (event, stateName)=>{
  event.persist(); 
  const newValue = event.target.value === 'true';
  setStates((prevStates) => ({
    ...prevStates,
    [stateName]: newValue,
  }));
  console.log(states)

}
  
const checkButton = () => {
  const areAllStatesFilled = Object.values(states).every((stateValue) => stateValue !== '');
  setDisabled(!areAllStatesFilled);
};


const saveUpitnik=()=>{

  const statesArray = Object.values(states);
  const obj={
     email:localStorage.userId,
     answers: statesArray
  };
  axios.post('http://localhost:8090/api/questionnaire/submitQuestionnaire',obj,{
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    },
  })
  .then(response=>{
    console.log(response.data)
    console.log(`Bearer ${localStorage.token}`);
    window.location.href="http://localhost:3000"
  })
  .catch(err=>{
    console.log(err)
    console.log(`Bearer ${localStorage.token}`);}
    )
}


useEffect(() => {
  checkButton();
}, [states]);
 

   return(


<div>

          <div className={classes.okvir}>
                 <h3> Upitnik</h3>


                 {ques.map((question) => {

                  const { id,text}=question;
                   const stateKey = `state${id + 1}`;
                  return (
                    <div className={classes.gridcontainer} key={id}>
                         <div className={classes.griditem}> <div> {id+1}</div></div>
                      
                      <div className={classes.griditem}>
                          <div className={classes.pitanje}>
                          {text}</div>
                          </div>
                          {/* ...other elements... */}
                        <div className={classes.griditem}>
                        <input
                          type="radio"
                          value='true'
                          checked={states[stateKey] === true}
                          onChange={(event) => handleChange(event, stateKey)}
                        />
                        <label>Da</label>
                      </div>
                      <div className={classes.griditem}>
                        <input
                          type="radio"
                          value='false'
                          checked={states[stateKey] === false}
                          onChange={(event) => handleChange(event, stateKey)}
                        />
                        <label>Ne</label>
                      </div>
                    </div>
 
                  );
                   }  )}

                  
         
          </div>
          <div className={classes.button}>
          <button disabled={disabled} onClick={saveUpitnik}> Potvrdi</button>
          </div>
  </div>




           


   );




}
export default (Upitnik)