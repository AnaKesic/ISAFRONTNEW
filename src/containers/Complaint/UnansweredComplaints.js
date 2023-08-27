import React,{ Component } from "react";
import classes from './AnsweredComplaints.css'
import axios from 'axios'



class UnansweredComplaints extends Component {
    state = {
        complaints: [],
        answers: {} // Use a dictionary to store individual answers
    }

    componentDidMount() {
        axios.get('http://localhost:8090/api/complaint/getAllUnanswered')
            .then(res => {
                const apps = res.data;
                const answers = {}; // Initialize the answers dictionary
                apps.forEach(comp => {
                    answers[comp.id] = ""; // Initialize answer for each complaint
                });
                this.setState({ complaints: apps, answers: answers });
            });
    }

    handleChange = (event, id) => {
        const { answers } = this.state;
        const updatedAnswers = { ...answers, [id]: event.target.value };
        this.setState({ answers: updatedAnswers });
    }

    handleSubmit = (event, id) => {
        const { answers } = this.state;
        const obj = {
            complaintId: id,
            answer: answers[id], // Get answer from the corresponding complaint
            adminEmail: localStorage.userId
        }
        axios.post('http://localhost:8090/api/complaint/answer', obj)
            .then(res => {
                  console.log(res.data)
                  window.location.href="http://localhost:3000/AnsweredComplaints"
            });

        // Optional: You can clear the answer after submission if needed
        const updatedAnswers = { ...answers, [id]: "" };
        this.setState({ answers: updatedAnswers });
    }

    render() {
        const { complaints, answers } = this.state;
        return (
            <div className={classes.container}>
                {complaints.map(comp => {
                    const { subject, text, id } = comp;
                    return (
                        <div className={classes.unscard} key={id}>
                            <div className={classes.header}>{subject}</div>
                            <label className={classes.minilabel}>Complaint:</label>
                            <div className={classes.complaint}>
                                <label className={classes.text}>{text}</label>
                            </div>
                            <label className={classes.minilabel}>Add answer:</label>
                            <textarea
                                placeholder="Add answer..."
                                className={classes.complaint}
                                onChange={(event) => this.handleChange(event, id)}
                                value={answers[id]} // Use individual answer from state
                            ></textarea>
                            <input
                                value="Submit answer"
                                type="button"
                                disabled={answers[id] === ""}
                                onClick={(event) => this.handleSubmit(event, id)}
                            ></input>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default UnansweredComplaints;
