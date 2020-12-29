/*
* Author: Solomon Antoine
* Date: 5/23/2018
* This app sends emails via Sendgrid
*/
import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        roll: 0,
        email: {
          recipient: '',
          sender: '',
          subject: '',
          text: '',
          sendAt: ''
        }
    };
    this.sides = [
        "translateZ(-100px) rotateY(0deg)",
        "translateZ(-100px) rotateX(-180deg)",
        "translateZ(-100px) rotateY(-90deg)",
        "translateZ(-100px) rotateY(90deg)",
        "translateZ(-100px) rotateX(-90deg)",
        "translateZ(-100px) rotateX(90deg)"
    ];
    this.handleClick = this.handleClick.bind(this);
    // this.render = this.render.bind(this);
  }

  componentDidMount(){
    // const m = moment()
    // alert("test of parseInt " + (parseInt("215", 10) + 4) )
    // // alert("normal time " + m.add(72, "hours").unix()) // correct now
    // m.add(72, "hours")
    // alert("manipulated time " + m.format("LLL").toString())
    // alert("manipulated time 2 " + m.unix()) // correct now
  }

  // scheduled send https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/scheduled-send.md
  sendEmail = _ => {
    const { email } = this.state;
    alert("send at " + email.sendAt)
    // removed appended &send_at=${email.sendAt} on fetch
    fetch(`http://localhost:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}&send_at=${email.sendAt}`) //query string url
      .catch(err => console.error(err))
    alert ("you will receive your email by " + new Date(email.sendAt * 1000))
  }

  handleClick(e) {
    const { email } = this.state;
    var die = document.getElementById("die");
    var sides = this.sides
    const mom = moment()

    die.classList.add("rolling");

    setTimeout( () => {
        var roller = Math.floor(Math.random() * (sides.length))
        die.classList.remove("rolling");
        die.style.transform = sides[roller];
        this.setState({ roll: roller })
        this.setState({ email: {...email, sendAt: mom.add(72/(this.state.roll +1), "hours").unix()} })
        
    }, 750);

    setTimeout( () => {
    console.log("value of roll " + (this.state.roll + 1))
    }, 1000);
}

  render() {
    let divs = this.sides.map((side, index) => {
      return <div className="side">{index+1}</div>
    });

    // const mom = moment()
    // const momUnix = mom.unix()
    // console.log("type of " + typeof momUnix)
    // console.log("type of " + typeof mom.add((this.state.roll +1), "hours").unix())

    // alert("moment unix " + momUnix)
    const { email } = this.state;
    const spacer = {
      margin: 10
    }
    const textArea = {
      borderRadius: 4
    }
    return (
      <div className="App" >
        <div className="die-container" onClick={ this.handleClick }>
          <div id="die" className={'d' + this.sides.length}>
                    { divs }
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div 
        // style={{ marginTop: 10 }} 
        >
          <h2> Send Email </h2>
          <label> Recipient </label>
          <br />
          <input 
            value={email.recipient}
            onChange={e => this.setState({ email: { ...email, recipient: e.target.value } })} />
          <div style={spacer} />
          <label> Sender </label>
          <br />
          <input 
            value={email.sender}
            onChange={e => this.setState({ email: { ...email, sender: e.target.value } })} />
          <div style={spacer} />
          <label> Subject </label>
          <br />
          <input 
            value={email.subject}
            onChange={e => this.setState({ email: { ...email, subject: e.target.value } })} />
          <div style={spacer} />
          <label> Message </label>
          <br />
          <input
          value = {email.sendAt}
          type="hidden"
            onChange={e => this.setState({ email: { ...email, sendAt: e.target.value } })} /> 
          <br />
          <textarea rows={3} 
          value={email.text} 
          style={textArea}
            onChange={e => this.setState({ email: { ...email, text: e.target.value } })} />
          <div style={spacer} />
          <button onClick={this.sendEmail}> Send Email </button>
        </div>
      </div>
    );
  }
}

export default App;
