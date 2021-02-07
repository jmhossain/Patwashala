import React, {Component} from 'react';
import './Dashboard.css'
class Dashboard extends Component{
    render(){
    return(
        <div className="Dashboard">
            <h1>Hello {this.props.username}</h1>
            <PostForm></PostForm>
            <Posts />
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
                <label htmlFor="title">Title</label><br />
                <input name="title" type="text" value={this.state.value} onChange={this.handleChange}></input><br />
                <label htmlFor="post">Post</label><br />
                <textarea name="post" rows="5" value={this.state.value} onChange={this.handleChange}></textarea>
            </form>
        );
    }
}

class Posts extends Component{
    state = {
        posts: [2,3,4]
    }
    async componentDidMount(){
        try {
            const postss = await(await fetch('/posts')).json();
            this.setState({'posts': postss})
        } catch (error) {
            console.log(error);
        }

    }
    render(){
        const postelements = this.state.posts.map(post => {
            return <Post {...post} />
        });
        return <section>
            {postelements}
        </section>
    }
}

class Post extends Component{
    render(){
        return <article className="Post">
            <h2>{this.props.title}</h2>
            <address>From <a rel="author">{this.props.username}</a></address>
            <p>{this.props.post}</p>
        </article>
    }
}

export default Dashboard;