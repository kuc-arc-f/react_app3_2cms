
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import LibTask from '../../libs/LibTask';
import firebase from 'firebase'

//
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
        this.provider = new firebase.auth.GoogleAuthProvider();
    }
    componentDidMount(){
        this.popup_open()
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    popup_open(){
        var self = this
        firebase.auth().signInWithPopup(this.provider).then(function(result) {
            var token = result.credential.accessToken;
            console.log(token)
            var user = result.user;
console.log(user.uid)
console.log(user.email)
//                alert("Sucess, Login complete")
            self.props.history.push("/");
//            self.$router.push('/')
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });        
    }
    render() {
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Login</h1>
            <hr />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>test
                </button>
            </div>
        
        </div>
        )
    }
}
export default Login;

