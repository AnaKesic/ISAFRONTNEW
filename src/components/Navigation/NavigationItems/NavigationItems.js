import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
       
       {(props.role==="ROLE_SystemAdmin")? null:
       <NavigationItem link="/bloodbanks">Banke krvi</NavigationItem>}
       {(props.role==="ROLE_Donor")?
            <NavigationItem link ="/Appointments">Termini</NavigationItem>
            : null
        }
    
         {(props.role==="ROLE_Donor")?
            <NavigationItem link ="/questionnaire">Upitnik</NavigationItem>
            : null
        }
         {(props.role==="ROLE_Donor")?
            <NavigationItem link ="/donorcomplaints">Žalbe</NavigationItem>
            : null
        }
         {(props.isAuthenticated)?
            <NavigationItem link ="/myprofile">Moj profil</NavigationItem>
            : null
        }
        {
            (props.role==="ROLE_Donor")?
            <NavigationItem link ="/mypenalties">Penali</NavigationItem>
            : null
        }
         {
            (props.role==="ROLE_SystemAdmin")?
            <NavigationItem link ="/AnsweredComplaints">Moje žalbe</NavigationItem>
            : null
        }
        {
            (props.role==="ROLE_SystemAdmin")?
            <NavigationItem link ="/AnswerComplaint">Odgovori na žalbe</NavigationItem>
            : null
        }
      
        {!props.isAuthenticated ?
             <NavigationItem link="/auth">Registacija</NavigationItem>
            : null}

       { (!props.isAuthenticated)?
             <NavigationItem link="/login"> Prijavite se</NavigationItem>
             : (<NavigationItem link="/logout">Odjavite se</NavigationItem>)}
       
       
    </ul>
);

export default navigationItems;