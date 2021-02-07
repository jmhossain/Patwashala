import React, {Component} from 'react';
import './Dashboard.css'
class Dashboard extends Component{
    render(){
    return(
        <div className="Dashboard">
            <h1>Hello {this.props.username}</h1>
            <PostForm></PostForm>
        </div>
    );   
    } 
}
class PostForm extends Component{
    state = {
        title: "",
        post: ""
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/post', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label for="title">Title</label><br />
                <input name="title" type="text" value={this.state.value} onChange={this.handleChange}></input><br />
                <label for="post">Post</label><br />
                <textarea name="post" rows="5" value={this.state.value} onChange={this.handleChange}></textarea>
            </form>
        );
    }
}

export default Dashboard;