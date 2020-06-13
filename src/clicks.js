export const clickAll = (state, activeButton) => {
    activeButton.All = 'active';
    activeButton.Active = '';
    activeButton.Completed = '';
}

export const clickActive = (state, activeButton) => {
    activeButton.All = '';
    activeButton.Active = 'active';
    activeButton.Completed = '';

    // updateArray("Active", state);
}

export const clickCompleted = (state, activeButton) => {
    activeButton.All = '';
    activeButton.Active = '';
    activeButton.Completed = 'active';

    // updateArray("Completed", state);
}


export const clickClear = (state) => {
    for (let key in state.All) {
        if (state.All[key].active === false) {
            delete state.All[key];
        }
    }
    delete state.Completed;
    state.Completed = {};
}


export const clickHandler = (state, inputValue, count, activeButton) => {
    // {/*console.log(state);*/}
    state.All[count] = {};
    state.All[count].value = inputValue
    state.All[count].active = true;
    state.Active[count] = {};
    state.Active[count].value = inputValue
    state.Active[count].active = true;
}

// export default {clickActive,clickAll,clickCompleted};