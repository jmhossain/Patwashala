import React from 'react'
import "./auth.css"
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
   handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.username !== "" && this.state.password !== "") {
         console.log(this.state)
      }

   }
   render() {
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
            <div className="password">
               <label htmlFor="password">Confirm Password</label>
               <input name="confirmpassword" onChange={this.handleChange} type="password" />
            </div>
            <input type="submit" value="Sign Up" />
         </form>
      </div>
   }
}
export default SignUp;