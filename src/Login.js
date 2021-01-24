import React from 'react';
import './auth.css';
import {Link} from 'react-router-dom';
class Login extends React.Component{
   state = {
      username : "",
      password : ""
   }
   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }
   handleSubmit = async (e) => {
      e.preventDefault()
      if(this.state.username !== "" && this.state.password !== ""){
         console.log(this.state)
         await fetch('/login', {
            method: 'POST',
            body:JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
         })
      }
      
   }

   render(){
      return <div className="container">
                <form onSubmit={this.handleSubmit}>
                  <div className="username">
                     <label htmlFor="username">Username</label>
                     <input name="username" onChange={this.handleChange} type="text" />
                  </div>
                  <div className="password">
                     <label htmlFor="password">Password</label>
                     <input name="password" onChange={this.handleChange} type="password" /> 
                  </div>
                  <input type="submit" value="Login"/>
                  <Link to="/signup"><a>Don't have an account?</a></Link>
               </form>
            </div>
   }
}
export default Login;