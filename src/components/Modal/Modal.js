import React from 'react'
import classes from './Modal.css'

const ErrorModal = (props) => {
    return (
      <section>
        <div className={classes.modalBackdrop} onClick={props.onClose} >
        <div className={classes.modalcontainer} >
          <header>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.errormsg}>
            <p>{props.message}</p>
          </div>
          <footer className={classes.modalclose}>
            <button type="button" onClick={props.onClose}>Zatvori</button>
          </footer> 
        </div>
        </div>
      </section>
    )
   }
   export default ErrorModal