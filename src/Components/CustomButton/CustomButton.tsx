import React from 'react';
import './CustomButton.css';
import {clsx} from 'clsx';

const CustomButton = (props) => {
    return(
        <>
        {props.color != "red" ? (<button type="button" className="custom-button-green" onClick={props.onClick}>
        {props.label}
        </button>) : (<button type="button" className="custom-button-red" onClick={props.onClick}>
        {props.label}
        </button>)
        }
        </>
    );
};

export default CustomButton;