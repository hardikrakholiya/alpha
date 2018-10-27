import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./SignUpForm.css";

import {
  FormControl,
  Form,
  Radio,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { FieldGroup } from "./FieldGroup";

class SignUpForm extends React.Component {
  createUser(user) {
    return fetch("http://149.165.169.102:9101/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        // console.log("res ", res);
        if (res.ok) {
          return res.json();
        }
      })

      .then(result => {
        // console.log("result", result);
        return result;
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      city: "Bloomington, IN",
      country: "US",
      company: "apple",
      subscribedToNewsAlerts: "",
      subscribedToWeatherAlerts: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log("onchange", e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    let user = {
      credentials: {
        username: this.state.username,
        password: this.state.password
      },
      userPreferences: {
        city: this.state.city,
        country: this.state.country,
        company: this.state.company,
        subscribedToNewsAlerts: this.state.subscribedToNewsAlerts,
        subscribedToWeatherAlerts: this.state.subscribedToWeatherAlerts
      }
    };
    //to check if user already exists, return should be either 409 or -1(to be done)
    console.log(user);
    this.createUser(user).then(userId => {
      // console.log("userid" + userId.message);
      if (userId.status === 409) {
        console.log("user already exists");
        alert("user already exists");
      } else {
        alert("user created, please click on login");
        console.log("user created");
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <Form style={{ width: "50%", margin: "auto" }} onSubmit={this.onSubmit}>
        <h1>SignUp</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <div className="form-div">
          <div>
            <FieldGroup
              id="useremail"
              type="email"
              label="Email: "
              onChange={this.onChange}
              placeholder="Enter text"
            />
          </div>

          <div>
            <FieldGroup
              id="pass"
              onChange={this.onChange}
              type="password"
              label="Password: "
              placeholder="Enter Password"
            />
          </div>

          <div>
            <FieldGroup
              id="pass_con"
              onChange={this.onChange}
              type="password"
              label="PassConfirm: "
              placeholder="Enter Password"
            />
          </div>
          <br />
          <div>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <ControlLabel id="controllabel" style={{ margin: "auto" }}>
                City:{" "}
              </ControlLabel>

              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onChange}
                id="formControl"
              >
                <option value="select">select</option>
                <option value="Bloomington, IN">Bloomington, IN</option>
                <option value="New York, NY">New York, NY</option>
                <option value="Los Angeles, CA">Los Angeles, CA</option>
                <option value="Houston, TX">Houston, TX</option>
                <option value="Chicago, IL">Chicago, IL</option>
              </FormControl>
            </FormGroup>
          </div>
          <br />

          <div>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <ControlLabel id="controllabel" style={{ margin: "auto" }}>
                Country:{" "}
              </ControlLabel>

              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onChange}
                id="formControl"
              >
                <option value="select">select</option>
                <option value="US">US</option>
                <option value="AU">AU</option>
                <option value="CA">CA</option>
                <option value="JP">JP</option>
              </FormControl>
            </FormGroup>
          </div>
          <br />

          <div>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <ControlLabel id="controllabel" style={{ margin: "auto" }}>
                Company:{" "}
              </ControlLabel>

              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onChange}
                id="formControl"
              >
                <option value="select">select</option>
                <option value="apple">Apple</option>
                <option value="facebook">Facebook</option>
              </FormControl>
            </FormGroup>
          </div>
          <br />

          <div>
            <FormGroup
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "-65%"
              }}
            >
              <ControlLabel>News Alert: </ControlLabel>
              <div style={{ marginLeft: "30px" }}>
                <Radio
                  // type="radio"
                  value="true"
                  name="subscribedToNewsAlerts"
                  checked={this.state.subscribedToNewsAlerts === "true"}
                  onChange={this.onChange}
                  inline
                />
                Yes{" "}
                <Radio
                  // type="radio"
                  value="false"
                  name="subscribedToNewsAlerts"
                  checked={this.state.subscribedToNewsAlerts === "false"}
                  onChange={this.onChange}
                  // className="form-control"
                  inline
                />
                No
              </div>
            </FormGroup>
          </div>
          <br />
          <div>
            <FormGroup
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "-65%"
              }}
            >
              <ControlLabel>Weather Alert: </ControlLabel>
              <div style={{ marginLeft: "11px" }}>
                <Radio
                  type="radio"
                  value="true"
                  name="subscribedToWeatherAlerts"
                  checked={this.state.subscribedToWeatherAlerts === "true"}
                  onChange={this.onChange}
                  inline
                />
                Yes{" "}
                <Radio
                  type="radio"
                  value="false"
                  name="subscribedToWeatherAlerts"
                  checked={this.state.subscribedToWeatherAlerts === "false"}
                  onChange={this.onChange}
                  inline
                />
                No
              </div>
            </FormGroup>
          </div>
        </div>
        <br />

        <div className="clearfix">
          <button className="signupbtn" inline>
            SignUp
          </button>

          <button
            className="loginbtn"
            inline
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Login
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(SignUpForm);
