import {
	SUBMIT_FORM,
	}from '../actionCreators/actionTypes';


const defaultState = {
    Info: {
		email : "a@gmail.com",
        mobile : '00000000',
        first_name : 'Amit',
		last_name : null,
		radio : null,
		checked: [],
	}
};

export default (state = defaultState, action) =>{
	switch (action.type){
		case SUBMIT_FORM:
            console.log('reducer', state, action);
			return {...state, Info : {...state.Info, [action.key] : action.value}};
		default :
			return state;
	}
}

