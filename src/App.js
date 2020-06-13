import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {clickActive, clickAll, clickClear, clickCompleted, clickHandler} from './clicks.js';
import {Header} from "./components/Header";


// import './fontawesome.js';
// import {useSelector, useDispatch} from 'react-redux';
// import {increment, decrement, signin} from './actions';


const objKeysCount = (state, key) => Object.keys(state[key]).length


function App() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [listItems, setListItems] = useState();
    const [activeButton, setActiveButton] = useState({
        All: '',
        Active: '',
        Completed: ''
    });

    const initialState = localStorage.getItem('state') || {
        All: {},
        Active: {},
        Completed: {}
    };

    const [state, setState] = useState(initialState);
    // const numbers = [1,2,3,4];
    // const listItems = numbers.map((number) => <h4>{number}</h4>);

    const updateArray = (category, state) => {
        const arr = [];
        for (let key in state[category]) {
            arr.push({
                value: state[category][key].value,
                id: key
            });
        }

        setListItems(arr.map((item, i) =>
            <div className="panel" key={i.toString()}>
                <label className="container">
                    <input className="toggle" type="checkbox" checked={!state[category][item.id].active}
                           onChange={() => checkFluency(item.id, category, state, item.value)}/>
                    <span className="checkmark"/>
                </label>
                <label className={state[category][item.id].active ? "items" : "items_active"}> {item.value} </label>
                <span className="times" onClick={() => deleteItem(state, item.id)}> ×</span>
            </div>
        ));
    }


    const updateActive = () => {
        switch ('active') {
            case activeButton.All:
                updateArray("All", state);
                break;
            case activeButton.Active:
                updateArray("Active", state);
                break;
            case activeButton.Completed:
                updateArray("Completed", state);
                break;
            default:
                updateArray("All", state);
        }

    }

    const deleteItem = (state, id) => {
        delete state.All[id];
        delete state.Active[id];
        delete state.Completed[id];

        updateActive();
    }


    const checkFluency = (item, category, state, value) => {
        state.All[item].active = (!state.All[item].active);
        if (state.All[item].active == false) {
            state.Completed[item] = {};
            state.Completed[item].value = value;
            state.Completed[item].active = false
            delete state.Active[item];
        } else {
            state.Active[item] = {};
            state.Active[item].value = value;
            state.Active[item].active = true
            delete state.Completed[item];
        }
        updateArray(category, state);
    }

    const handleChange = (event) => {

        setInputValue(event.target.value);
    }


    const keyPressed = (event) => {
        if (event.key === "Enter") {
            clickHandler(state, inputValue, count, activeButton);
            setCount(count + 1);
            setInputValue('');
            // setCount(Count + 1);

            updateActive();
        }
    }

    const ItemsLeft = (state) => {
        const count = {countItem: 0};
        for (let key in state.props.Active) {
            count.countItem = count.countItem + 1;
        }
        return (count.countItem);
    }

    const ItemsLeftPure = (state) => {
        const count = {countItem: 0};
        for (let key in state.All) {
            count.countItem = count.countItem + 1;
        }
        return (count.countItem);
    }

    const completedCount = objKeysCount(state, 'Completed');
    const allCount = objKeysCount(state, 'All');

    const selectAll = (state, activeButton) => {

        if (completedCount === allCount) {
            for (let key in state.All) {
                state.All[key].active = false;
                checkFluency(key, 'All', state, state.All[key].value)
            }
        } else {
            for (let key in state.All) {
                state.All[key].active = true;
                checkFluency(key, 'All', state, state.All[key].value)
            }
        }


    }


    const click = (state, category, activeButton) => {
        switch (category) {
            case 'All':
                clickAll(state, activeButton);
                updateArray('All', state)
                break;
            case 'Active':
                clickActive(state, activeButton);
                updateArray('Active', state);
                break;
            case 'Completed':
                clickCompleted(state, activeButton);
                updateArray('Completed', state);
                break;
            case 'Clear':
                clickClear(state);
                updateActive();
                break;
            default:
                console.error('Unknown category', category);
        }
    }

    return (
        <div className="App">
            <Header/>
            <div className="shadow">
                <main className="main">
                    <div className="myflexInput">
                        <div className={completedCount === allCount && allCount !== 0 ? 'arrow_active' : 'arrow'}
                             onClick={() => selectAll(state, activeButton)}/>
                        <input type="text" onKeyPress={keyPressed} className="input"
                               placeholder="What needs to be done?" value={inputValue} onChange={handleChange}/>
                    </div>
                    <div>{listItems}</div>
                </main>
                {ItemsLeftPure(state) ?
                    <footer className="myFooter">
                        <div className="Row">
                            <button className={activeButton.All} onClick={() => click(state, 'All', activeButton)}>All
                            </button>
                            <button className={activeButton.Active}
                                    onClick={() => click(state, 'Active', activeButton)}>Active
                            </button>
                            <button className={activeButton.Completed}
                                    onClick={() => click(state, 'Completed', activeButton)}>Completed
                            </button>
                            <button className="clear" onClick={() => click(state, 'Clear', activeButton)}>Clear</button>
                            <span className='items_left-mobile'>items left <ItemsLeft props={state}></ItemsLeft></span>
                        </div>
                    </footer> : ''}
            </div>
        </div>
    );

}


export default App;



