import React from 'react';
import CustomButton from '../CustomButton/CustomButton.tsx';
import './Menu.css';
import {modes} from '../../instruments/modes.tsx';
import type {mode} from '../../instruments/modes.tsx';


const Menu = (props) => {
    return(
        <div className = "menu">
            <h2 className = "menu-header">Выберите режим игры</h2>
            <div className="items">
                {Object.entries(modes).map(([key, label]) => {
                    return(
                    <CustomButton color={"green"} key = {key} label={label}
                    onClick={() => props.onSelect(key as mode)} />
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;