import React from 'react';
import Wand from '../Wand/Wand.tsx'
import {useState, useEffect} from 'react';
import CustomButton from '../CustomButton/CustomButton.tsx'
import './Game.css'

function makeDefaultMove(n, a, b) {
    let t = n % (a + b);
    if(t < a)
        return a;
    if(t > b)
        return b;
    return t;
}

function makeHardMove(wands, n, a, b) {
    let sections: [number, number][] = [];
    let moves: [number, number][] = [];
    let maxN = 0;
    for(let i = 0; i < n; i++) {
        if(!wands[i]) {
            continue;
        }
        let j = i;
        while(wands[j])
            j++;
        j--;
        sections.push([i, j]);
        maxN = Math.max(maxN, j - i + 1);
        i = j;
    }
    let numbersOfGrundy = Array(maxN+1).fill(0);
    for(let length = 1; length <= maxN; length++) {
        let mexNumbers = new Set<number>();
        for(let wandsLeft = 0; wandsLeft <= length - a; wandsLeft++) {
            for(let wandsRight = Math.max(length - wandsLeft - b, 0); length - wandsLeft - wandsRight >= a; wandsRight++) {
                let p = numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
                mexNumbers.add(p);
            }
        }
        let newNumberOfGrundy = 0;
        while(mexNumbers.has(newNumberOfGrundy))
            newNumberOfGrundy++;
        numbersOfGrundy[length] = newNumberOfGrundy;
    }

    let isWin = 0;
    sections.map(([begin, end]) => {isWin ^= numbersOfGrundy[end - begin + 1]});
    if(isWin == 0) {
        for(let i = 0; i < sections.length; i++) {
            if(sections[i][1] - sections[i][0] + 1 >= a) {
                return [sections[i][0], sections[i][0] + a - 1];
            }
        }
    }
    

    for(let i = 0; i < sections.length; i++) {
        let begin = sections[i][0];
        let end = sections[i][1];
        let length = end - begin + 1;
        let sectionNumberOfGrundy = numbersOfGrundy[length];
        for(let wandsLeft = 0; wandsLeft <= length - a; wandsLeft++) {
            for(let wandsRight = Math.max(length - wandsLeft - b, 0); length - wandsLeft - wandsRight >= a; wandsRight++) {
                let newIsWin = sectionNumberOfGrundy ^ isWin ^ numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
                if(newIsWin == 0) {
                    begin += wandsLeft;
                    end -= wandsRight;
                    return [begin, end];
                }
                else
                    moves.push([begin + wandsLeft, end - wandsRight]);
            }
        }
    };
    let number = Math.floor(Math.random() * moves.length);
    console.log(number[0] + ' ' + number[1]);
    return moves[number];
}


function makeSuperhardMove(wands, n) {
    
    let sections: [number, number][] = [];
    let moves: [number, number, number][] = [];
    let maxN = 0;
    for(let i = 0; i < n; i++) {
        if(!wands[i]) {
            continue;
        }
        let j = i;
        while(wands[j])
            j++;
        j--;
        sections.push([i, j]);
        maxN = Math.max(maxN, j - i + 1);
        i = j;
    }
    let numbersOfGrundy = Array(maxN+1).fill(0);
    for(let length = 1; length <= maxN; length++) {
        let mexNumbers = new Set<number>();
        for(let dis = 0; dis < length; dis++) {
            let wandsLeft = dis;
            let wandsRight = length - wandsLeft - 2;
            let p = numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
            mexNumbers.add(p);
        }
        for(let firstDis = 0; firstDis < length-1; firstDis++) {
            for(let secondDis = firstDis + 1; secondDis < length; secondDis++) {
                let wandsLeft = firstDis;
                let wandsRight = length - secondDis - 1;
                let wandsMiddle = length - wandsLeft - wandsRight - 2;
                let p = numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight] ^ numbersOfGrundy[wandsMiddle];
                mexNumbers.add(p);
            }
        }
        for(let begin = 0; begin <= length - 2; begin++) {
            let wandsLeft = begin;
            let wandsRight = length - wandsLeft - 3;
            let p = numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
            mexNumbers.add(p);
        }

        let newNumberOfGrundy = 0;
        while(mexNumbers.has(newNumberOfGrundy))
            newNumberOfGrundy++;
        numbersOfGrundy[length] = newNumberOfGrundy;
    }
    let isWin = 0;
    sections.map(([begin, end]) => {isWin ^= numbersOfGrundy[end - begin + 1]});
    

    for(let i = 0; i < sections.length; i++) {
        let begin = sections[i][0];
        let end = sections[i][1];
        let length = end - begin + 1;
        let sectionNumberOfGrundy = numbersOfGrundy[length];
        for(let dis = 0; dis < length; dis++) {
            let wandsLeft = dis;
            let wandsRight = length - wandsLeft - 1;
            let newIsWin = isWin ^ sectionNumberOfGrundy ^ numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
            if(newIsWin == 0) {
                return [0, dis + begin, -1];

            }
            else
                moves.push([0, dis + begin, -1]);
        }
        for(let firstDis = 0; firstDis < length-1; firstDis++) {
            for(let secondDis = firstDis + 1; secondDis < length; secondDis++) {
                let wandsLeft = firstDis;
                let wandsRight = length - secondDis - 1;
                let wandsMiddle = length - wandsLeft - wandsRight - 2;
                let newIsWin = isWin ^ sectionNumberOfGrundy ^ numbersOfGrundy[wandsLeft] 
                ^ numbersOfGrundy[wandsRight] ^ numbersOfGrundy[wandsMiddle];
                if(newIsWin == 0) {
                    return [0, firstDis + begin, secondDis + begin];
                }
                else
                    moves.push([0, firstDis + begin, secondDis + begin]);
            }
        }
        for(let start = 0; start <= length - 3; start++) {
            let wandsLeft = start;
            let wandsRight = length - wandsLeft - 3;
            let newIsWin =  isWin ^ sectionNumberOfGrundy ^ numbersOfGrundy[wandsLeft] ^ numbersOfGrundy[wandsRight];
            if(newIsWin == 0) {
                return [1, start + begin, start + begin + 2];
            }
            else
                moves.push([1, start + begin, start + begin + 2]);
        }
    }

    for(let i = 0; i < sections.length - 1; i++) {
        let begin1 = sections[i][0];
        let end1 = sections[i][1];
        let length1 = end1 - begin1 + 1;
        let sectionNumberOfGrundy1 = numbersOfGrundy[length1];
        for(let j = i+1; j < sections.length; j++) {
            let begin2 = sections[j][0];
            let end2 = sections[j][1];
            let length2 = end2 - begin2 + 1;
            let sectionNumberOfGrundy2 = numbersOfGrundy[length2];
            for(let firstDis = 0; firstDis < length1; firstDis++) {
                let wandsLeft1 = firstDis;
                let wandsRight1 = length1 - wandsLeft1 - 1;
                for(let secondDis = 0; secondDis < length2; secondDis++) {
                    let wandsLeft2 = secondDis;
                    let wandsRight2 = length2 - wandsLeft2 - 1;
                    let newIsWin = isWin ^ sectionNumberOfGrundy1 ^ sectionNumberOfGrundy2 ^
                    numbersOfGrundy[wandsLeft1] ^ numbersOfGrundy[wandsRight1] ^ numbersOfGrundy[wandsLeft2] ^
                    numbersOfGrundy[wandsRight2];
                    if(newIsWin == 0) {
                        return [0, firstDis + begin1, secondDis + begin2];
                    }
                    else
                        moves.push([0, firstDis + begin1, secondDis + begin2]);
                }
            }
        }
    }
    
    let ans = moves[Math.floor(Math.random() * moves.length)];
    return ans;
}

const Game = (props) => {
    const [wands, setWands] = useState<Array<"sel" | "def" | "dis">>(Array(props.n).fill("def"));
    const [selectedWands, setSelectedWands] = useState(0);
    const [isTimeout, setIsTimeout] = useState(false);

   useEffect(() => {
        let a = props.interval[0];
        let n = props.n;
        if(props.activeMode != 'hard') {
        let count_of_dis = 0;
        wands.map((state) => {if(state == 'dis') count_of_dis++});
        if(n - count_of_dis < a) {
            setTimeout(() => {
            if(props.player == 'p')
                alert("К сожалению, вы проиграли!");
            else
                alert('Поздравляю, вы победили!');
            props.closeGame();
            }, 200);
        }
        }
        else {
            let isDis = Array(n).fill(false);
            wands.map((state, i) => {isDis[i] = state != 'dis'});
            let sections: [number, number][] = [];
            let maxN = 0;
            for(let i = 0; i < n; i++) {
                if(!isDis[i]) {
                    continue;
                }
                let j = i;
                while(isDis[j])
                    j++;
                j--;
                sections.push([i, j]);
                maxN = Math.max(maxN, j - i + 1);
                i = j;
            }
            if(maxN < a) {
            setTimeout(() => {
            if(props.player == 'p')
                alert("К сожалению, вы проиграли!");
            else
                alert('Поздравляю, вы победили!');
            props.closeGame();
            }, 200);
        }
        }
   }, [wands]);

    const selectWand = (number) => {
        if(props.player == 'c') {
            alert("comp!");
            return;
        }
        if(wands[number] == 'sel') {
            let new_wands = Array(props.n).fill("def");
            wands.map((state, i) => {new_wands[i] = state});
            new_wands[number] = 'def';
            setWands(new_wands);
            setSelectedWands(selectedWands-1);
        }
        else if(wands[number] == 'def' && selectedWands < props.interval[1]) {
            let new_wands = Array(props.n).fill("def");
            wands.map((state, i) => {new_wands[i] = state;});
            new_wands[number] = 'sel';
            setWands(new_wands);
            setSelectedWands(selectedWands+1);
        }
    }

    
    const makeMove = () => {
        if(selectedWands < props.interval[0]) {
            alert('Нужно больше палочек!');
            return;
        }
        let last_sel = -1;
        let first_sel = -1;
        wands.map((state, i) => {first_sel = (state == 'sel' && first_sel == -1) ? (i) : (first_sel)});
        wands.map((state, i) => {last_sel = (state == 'sel') ? (i) : (last_sel)});
        if(last_sel - first_sel + 1 != selectedWands && (props.activeMode == 'hard' || (props.activeMode == 'superhard' && selectedWands == 3))) {
            alert("Не все палочки лежат подряд!");
            return;
        }
        let new_wands = Array(props.n).fill("def");
        wands.map((state, i) => {new_wands[i] = wands[i] != 'sel' ? (state) : ('dis')});
        setWands(new_wands);
        setSelectedWands(0);
        props.setPlayer('c');
    }

    if(!isTimeout && props.player == 'c') {
        let count_of_defs = 0;
        let n = props.n;
        let a = props.interval[0];
        let b = props.interval[1];
        let new_wands = Array(n).fill('def');
        wands.map((state, i) => (new_wands[i] = state));
        wands.map((state) => {if(state == 'def') count_of_defs++;});

        let isDis = Array(n).fill(false);
            wands.map((state, i) => {isDis[i] = state != 'dis'});
            let sections: [number, number][] = [];
            let maxN = 0;
            for(let i = 0; i < n; i++) {
                if(!isDis[i]) {
                    continue;
                }
                let j = i;
                while(isDis[j])
                    j++;
                j--;
                sections.push([i, j]);
                maxN = Math.max(maxN, j - i + 1);
                i = j;
            }

        if(props.activeMode == 'default') {
            let computer_move = makeDefaultMove(count_of_defs, a, b);
            new_wands.map((state, i) => {
                if(computer_move > 0 && state == 'def') {
                    new_wands[i] = 'dis';
                    computer_move--;
                }
            });
        }
        else if(props.activeMode == 'hard') {
            if(maxN >= a) {
            let isDef = Array(props.n).fill(false);
            wands.map((state, i) => (isDef[i] = state == 'def'));
            let [begin, end]= makeHardMove(isDef, n, a, b);
            console.log(begin + ' ' + end);
            for(let i = begin; i <= end; i++) {
                new_wands[i] = 'dis';
            }
            let s = '';
            for(let i = 0; i < new_wands.length; i++) {
                s = s + new_wands[i] + ' ';
            }
            console.log(s);
            }
        }
        else {
            let count_of_dis = 0;
            wands.map((state) => {if(state == 'dis') count_of_dis++});
            if(count_of_dis < n) {
            let isDef = Array(n).fill(false);
            wands.map((state, i) => (isDef[i] = state == 'def'));
            let [isThree, begin, end] = makeSuperhardMove(isDef, n);
            if(isThree == 1) {
                new_wands[begin] = 'dis';
                new_wands[begin+1] = 'dis';
                new_wands[begin+2] = 'dis';
            }
            else if(end != -1) {
                new_wands[begin] = 'dis';
                new_wands[end] = 'dis';
            }
            else {
                new_wands[begin] = 'dis';
            }
            }
        }

        setIsTimeout(true);
            setTimeout(() => {
                setWands(new_wands);
                props.setPlayer('p');
                setIsTimeout(false);
            }, 500);
    }
    

    return(
        <div className="game">
            <div className="board">
            {wands.map((state, i) => {
                return(
                <>
                <div className="wand">
                <div>
                    <h6>{i+1}</h6>
                </div>
                <Wand key={i} number={i} onClick={() => selectWand(i)} state={state} />
                </div>
                </>
                );
            })}
            </div>
            <div className="buttons">
                <CustomButton color={"green"} onClick={makeMove} label={"Сделать ход"} />
                <CustomButton color={"red"} onClick={props.closeGame} label={"Вернуться в главное меню"} />
            </div>
        </div>
    );
}

export default Game;