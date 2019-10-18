import { createStore } from 'redux';
import formSubmitReducer from './reducers/formSubmitReducer';

const defaultState = {
	Info: {
		email : "a@gmail.com",
        mobile : '00000000',
        first_name : 'Amit',
        last_name : null,
        radio : null,
        checked: [],
	}
}
export {defaultState}
export const store = createStore(formSubmitReducer,defaultState);
