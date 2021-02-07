import React from 'react'
import "./auth.css"
import {Link} from 'react-router-dom';

class SignUp extends React.Component {
   state = {
      username: "",
      password: "",
      confirmpassword: ""
   }
   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }
   handleSubmit = async (e) => {
      e.preventDefault()
      if (this.state.username !== "" && this.state.password !== "") {
         console.log(this.state)
         await fetch('/signup',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
         })
      }

   }
   render() {
      return(
      <center> 
         <form onSubmit={this.handleSubmit}>
            <div className="username">
               <label htmlFor="username">Username</label>
               <input name="username" onChange={this.handleChange} type="text" />
            </div>
            <div className="password">
               <label htmlFor="password">Password</label>
               <input name="password" onChange={this.handleChange} type="password" />
            </div>
            <div className="password">
               <label htmlFor="password">Confirm Password</label>
               <input name="confirmpassword" onChange={this.handleChange} type="password" />
            </div>
            <input type="submit" value="Sign Up" />
            <Link to="/login"><a>Already have an account? Login</a></Link> 
         </form>
      </center>)
   }
}
export default SignUp;