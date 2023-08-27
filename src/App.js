import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
//import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Flights from './containers/Flights/Flights';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import ActivateProfile from './containers/Auth/ActivateProfile';
import Upitnik from './containers/Upitnik/Upitnik';
import Homepage from './containers/homepage/Homepage';
import Newbb from './containers/Newbb/Newbb'
import Appointment from './containers/Appointment/Appointment';
import AllAppointments from './containers/Appointment/AllAppointments';
import HistoryAppointment from './containers/Appointment/HistoryAppointment';
import NewComplaint from './containers/Complaint/NewComplaint';
import AnsweredComplaints from './containers/Complaint/AsweredComplaints';
import UnansweredComplaints from './containers/Complaint/UnansweredComplaints';
import HistoryOfAppointments from './containers/Appointment/HistoryOfAppointments';
import SheduledAppointments from './containers/Appointment/SheduledAppointments';
import QRCodeList from './containers/Appointment/QRCodeList';
import AppointmentHP from './containers/Appointment/AppointmentHP';
import Message from './containers/Message/Message';
import AnsweredAdmin from './containers/Complaint/AnsweredAdmin';
import DonorComplaint from './containers/Complaint/DonorComplaint';
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
         <Route path="/auth" component={Auth} />
         <Route path="/login" component={Login} />
         <Route path="/activate/:id" component={ActivateProfile} />
         <Route path="/homepage" component={Homepage}/>
         <Route path="/message" component={Message}/>
         <Route path="/" component={Homepage}/>
        {/* <Route path="/flights" component={} */}
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
        
      </Switch>
    );

   if ( this.props.isAuthenticated && localStorage.role==="ROLE_Donor" ) {
      routes = (
        <Switch>
          <Route path="/appointments" component={AppointmentHP}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/questionnaire" component ={Upitnik}/>
          <Route path="/homepage" component={Homepage}/>
          <Route path="/newBloodBank" component={Newbb}/>
          <Route path="/newAppointment" component={Appointment}/>
          <Route path="/historyOfAppoinments" component={HistoryAppointment}/>
          <Route path="/:id/appointments" component={AllAppointments}/>
          <Route path="/newComplaint" component={NewComplaint}/>
          <Route path="/donorcomplaints" component={DonorComplaint}/>
          <Route path="/answeredcomplaints" component={AnsweredComplaints}/>
          <Route path="/historyOfAppointments" component={HistoryOfAppointments}/>
          <Route path="/sheduledAppointments" component={SheduledAppointments}/>
          <Route path="/QRCodeList" component={QRCodeList}/>
          <Route path="/" component={Homepage}/>
           {/* <Redirect to="/" />  */}
        </Switch>
      );
    } 
    if ( this.props.isAuthenticated && localStorage.role==="ROLE_SystemAdmin" ) {
      routes = (
        <Switch>
        
          <Route path="/logout" exact component={Logout}/>
         
         
          <Route path="/AnsweredComplaints" component={AnsweredAdmin}/>
         <Route path="/AnswerComplaint" component={UnansweredComplaints}/>
        
          
           {/* <Redirect to="/" />  */}
        </Switch>
      );
    } 

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role:state.auth.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
