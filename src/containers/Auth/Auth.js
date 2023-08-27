import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import ErrorModal from '../../components/Modal/Modal';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email adresa'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Lozinka'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            Confirmpassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Potvrdite lozinku'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    isPaswordSame:true
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ime'
                },
                value: '',
                validation: {
                    required: true,
                  
                },
                valid: false,
                touched: false
            },
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Prezime'
                },
                value: '',
                validation: {
                    required: true,
                  
                },
                valid: false,
                touched: false
            },
            jmbg: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'JMBG'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 13,
                    maxLength:13,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Broj telefona'
                },
                value: '',
                validation: {
                    required: true,
                    
                   
                },
                valid: false,
                touched: false
            },
            adress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ulica'
                },
                value: '',
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false
            },
            streetNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Broj kuce'
                },
                value: '',
                validation: {
                    required: true
                 
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Grad'
                },
                value: '',
                validation: {
                    required: true
                   
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Drzava'
                },
                value: '',
                validation: {
                    required: true
                   
                },
                valid: false,
                touched: false
            },
            job: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zanimanje'
                },
                value: '',
                validation: {
                    required: true
                  
                },
                valid: false,
                touched: false
            },
            jobDesc: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Opis zanimanja'
                },
                value: '',
                validation: {
                    required: true
                    
                },
                valid: false,
                touched: false
            },
             gender: {
                elementType: 'radio',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pol'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        error:null
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
        if ( rules.isPaswordSame ) {
           isValid=value=== this.state.controls.password.value && isValid
        }
        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        var user={
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            name: this.state.controls.name.value,
            surname: this.state.controls.surname.value,
            street: this.state.controls.adress.value,
            number: this.state.controls.streetNumber.value,
            city: this.state.controls.city.value,
            state: this.state.controls.state.value,
            phoneNum: this.state.controls.phoneNumber.value,
            gender: this.state.controls.gender.value,
            job: this.state.controls.job.value,
            jogInfo: this.state.controls.jobDesc.value,
            jmbg: this.state.controls.jmbg.value
        }
          this.props.register(user);
        //this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

   

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }
    errorHandler = () => {
        this.props.error=false;
       };


    render () {
        const formElementsArray = [];

        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        
        const formElementsToRender = formElementsArray.slice(0, formElementsArray.length - 1);

        let form = formElementsToRender.map( formElement => (
            <div className={classes.fields}>
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                </div>
        ) );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
           
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        let error= localStorage.error
      
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                { error===true && <ErrorModal title="Podaci nisu validni" message={this.props.error.message} onClose={localStorage.setItem('error',false)} /> }
                <div className="reg">
                <form className={classes.formAuth} onSubmit={this.submitHandler}>
                    {form}
               
                    <div className={classes.fields}>
                      
                        <div >
                        <label className={classes.radiolabel}>Pol:</label>
                        <span >
                        <label className={classes.radiolabel}>
                            <input
                            type="radio"
                            value="MUSKI"
                            checked={this.state.controls.gender.value === 'MUSKI'}
                            onChange={( event ) => this.inputChangedHandler( event, "gender" )}
                            />
                            Muški
                        </label>
                        </span>
                        <span>
                        <label className={classes.radiolabel}>
                            <input
                            type="radio"
                            value="ZENSKI"
                            checked={this.state.controls.gender.value === 'ZENSKI'}
                            onChange={( event ) => this.inputChangedHandler( event, "gender" )}
                            />
                            Ženski
                        </label>
                        </span>
                        </div>
                        </div>
                        <div className={classes.fields}>
                      
                        </div>
                        <input type="button" value="Posaljite zahtev" onClick={this.submitHandler} disabled={!(this.state.controls.email.valid &&
                                                    this.state.controls.password.valid &&
                                                    this.state.controls.Confirmpassword.valid &&
                                                    this.state.controls.name.valid &&
                                                    this.state.controls.surname.valid &&
                                                    this.state.controls.jmbg.valid &&
                                                    this.state.controls.phoneNumber.valid &&
                                                    this.state.controls.adress.valid &&
                                                    this.state.controls.city.valid &&
                                                    this.state.controls.state.valid &&
                                                    this.state.controls.job.valid &&
                                                    this.state.controls.jobDesc.valid &&
                                                    this.state.controls.gender.valid &&
                                                    this.state.controls.streetNumber.valid)}/>
                </form>
               
                </div>
               

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        register:(user)=>dispatch(actions.register(user))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );