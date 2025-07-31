import React from 'react';
import './Settings.css';
import {Slider, MenuItem, Select} from '@mui/material'
import CustomButton from '../CustomButton/CustomButton.tsx'

const Settings = (props) => {
    return(
        <div className = "settings">
            <div className="header">
            {props.activeMode == 'default' ? (
                <h2 className="settings-header">Вы выбрали Стандартный режим игры, в нём вы можете брать любые из оставшихся палочек</h2>
            ) : (null)}
            {props.activeMode == 'hard' ? (
                <h2 className="settings-header">Вы выбрали режим игры Подряд, в нём вы можете брать только те палочки, которые составляют непрерывную последовательность</h2>
            ) : (null)}
            {props.activeMode == 'superhard' ? (
                <h2 className="settings-header">Вы выбрали Особый режим игры, в нём вы можете брать 3 палочки подряд, либо 2 или 1 любые палочки</h2>
            ) : (null)}
            <button className = "closebtn" onClick = {props.close}>&times;</button>
            </div>
            <div className='player-or-computer'>
                <h3>Кто будет делать первый ход?</h3>
                <Select style={{width: "70%", color:"red"}} value={props.player} onChange={props.changePlayer}>
                    <MenuItem style={{color: "red"}} value='p'>Игрок</MenuItem>
                    <MenuItem style={{color: "red"}} value='c'>Компьютер</MenuItem>
                </Select>
            </div>
            <div className="slider-n">
                <h3>На доске будет <span style = {{color: "red", font: "bold"}}>{props.n}</span> палочек</h3>
                <Slider style={{color: "red"}} value={props.n} min={5} max={50} step={1} onChange={props.changeN} />
            </div>
            {props.activeMode != 'superhard' ?
            (<div className="slider-interval">
                <h3>На каждом ходу можно брать от<span style = {{color: "red", font: "bold"}}> {props.interval[0]} </span> 
                до <span style = {{color: "red", font: "bold"}}>{props.interval[1]}</span> палочек</h3>
                {props.activeMode != 'superhard' ? (
                    <Slider style={{color: "red"}} value={props.interval} min={1} max={props.n} step={1} onChange={props.changeInterval} />
                ) : (null)}
            </div>)
            : (null)}
            <div className="startGame">
                <CustomButton color={"red"} label={"Начать игру"} onClick={props.start}/>
            </div>
        </div>
    );
}

export default Settings;