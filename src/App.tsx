import React from 'react';
import Menu from './Components/Menu/Menu.tsx';
import './App.css';
import type {mode} from './instruments/modes.tsx';
import {useState} from 'react';
import Settings from './Components/Settings/Settings.tsx'
import Game from './Components/Game/Game.tsx'

function App() { 
  const [active_mode, setActiveMode] = useState<mode>("default");
  const [areSettingsActive, setSettingsActive] = useState(false);
  const [player, setPlayer] = useState<'p' | 'c'>('p');

  const setMode = (new_mode) => {
      setSettingsActive(true);
      setActiveMode(new_mode);
  }
  
  const [stateOfMode, setStateOfMode] = useState<null | mode>(null);
  const Close = () => {
      setSettingsActive(false);
  }

  const [interval, setInterval] = useState<[number, number]>([1,1]);
  const changeInterval = (e, new_range) => {
      setInterval(new_range);
  }

  const startOfGame = () => {
      if(active_mode == 'superhard')
          setInterval([1,3]);
      setStateOfMode(active_mode);
      setSettingsActive(false);
  }

  const [n, setN] = useState(5);
  const changeN = (e, newN) => {
      setN(newN);
  }

  const changePlayer = (e) => {
      setPlayer(e.target.value);
  }

  const setGamePlayer = (new_player) => {
        //alert("Nado: " + new_player);
        setPlayer(new_player);
        //alert("Now: " + player);
  }

  const closeGame = () => {
      setStateOfMode(null);
      setPlayer('p');
  }

  return(
    <div className="box">
        {stateOfMode == null ? (
          <>
              {!areSettingsActive ? (<Menu onSelect={setMode} />) :
              (<Settings n={n} interval={interval} player={player} close = {Close} start = {startOfGame}
               activeMode={active_mode} changeN={changeN} changeInterval={changeInterval} changePlayer={changePlayer}>
                </Settings>)
              }
          </>
        ) : (
          <>
          <Game n={n} interval={interval} player={player} activeMode={active_mode} closeGame={closeGame}
          setPlayer={setGamePlayer}>
          </Game>
          </>
        )}
    </div>
  );
}
export default App;
