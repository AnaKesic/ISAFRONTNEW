import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import classes from './Homepage.css'

class Homepage extends Component {

    state={
        bbanks:[]
     }

     componentDidMount() {
      axios.get('http://localhost:8090/api/bloodbank/getAll')
        .then(res => {
            const banks=res.data;
           this.setState({bbanks:banks})
           //this.state.flights=res.data;
           console.log(this.state)
        });
    }

      handleAppointment = (id) => {
        window.location.href='http://localhost:3000/'+id+'/appointments';
        }

    

    render() {
    
    const { bbanks} = this.state;
       
               
                       
                             return(    
                                    <React.Fragment>
                                    <div className={classes.body}>
                                    {bbanks.map(bank => {
                                           const { id,name,description, street, address,rating}=bank;

                                      return(
                                        <div className={classes.card}>
                                            <div className={classes.header}>
                                                <p>{name}</p>
                                            </div>
                                                <div className={classes.container}>
                                                <p>{description}</p>
                                                <p>Adresa:{address.street} {address.number}, {address.city}, {address.state}</p>
                                                <p>Ocena:{rating}</p>
                                                {this.props.isAuthenticated? <button onClick={() => this.handleAppointment(id)} >Make appointment</button> :null }
                                            </div>
                                        </div>
                                            )



                                    })}
                                    </div>
                                    </React.Fragment>
                             );}
}

const mapStateToProps = state => {
    return {
  
      isAuthenticated: state.auth.token !== null,
    }}
export default connect( mapStateToProps )( Homepage )
