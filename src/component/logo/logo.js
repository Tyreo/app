import React, {Component} from 'react';
import logo from './logo.png'
import './logo.css'
class Logo extends Component {
    render() {
        return (
            <div className="logo" style={{width:500,height:500}}>
                <img src={logo} alt="Tyreo"/>
            </div>
        );
    }
}

export default Logo;