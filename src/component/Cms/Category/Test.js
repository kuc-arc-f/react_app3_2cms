
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import firebase from 'firebase'
//
class Test extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.check_auth()
    }
    async check_auth(){
        try {
//            var valid= await LibAuth.valid_auth(firebase)
//console.log("#valid :" , valid )
        } catch (err) {
            console.error(`Error: ${JSON.stringify(err)}`)
        }     

    }
    handleClick(){
console.log("#-handleClick")
    }
    render() {
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Test</h1>
            <hr />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>test
                </button>
            </div>
        
        </div>
        )
    }
}
export default Test;

