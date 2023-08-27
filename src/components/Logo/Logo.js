import React from 'react';

//import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
      <label>  Ana's blood bank</label>
    </div>
);

export default logo;