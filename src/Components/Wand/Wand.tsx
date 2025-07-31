import React from 'react';
import './Wand.css';

const Wand = (props) => {
    return(<>
    {props.state == 'def' ? (
    <div className="wand-def" onClick={props.onClick}></div>) : (
    props.state =='sel' ? (<div className="wand-sel" onClick={props.onClick}></div>)
    : (<div className="wans-dis"></div>))}
    </>);
}

export default Wand;