import React, {useState} from 'react';
import App from './App';


export const clickAll = (state, activeButton) => {


    activeButton.All = 'active';
    activeButton.Active = '';
    activeButton.Completed = '';

    // updateArray("All", state);

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



  export const clickClear = (state, activeButton) => {
    for(let key in state.All){
      if(state.All[key].active == false){
         delete state.All[key];
      }
    }
    delete state.Completed;

    state.Completed = {}; 

    
  }



export const clickHandler = (state,inputValue, Count, activeButton) => {
    // {/*console.log(state);*/}
    state.All[Count] = {} ;
    state.All[Count].value = inputValue
    state.All[Count].active = true;
    state.Active[Count] = {} ;
    state.Active[Count].value = inputValue
    state.Active[Count].active = true;
    

  }


// export default {clickActive,clickAll,clickCompleted};


















