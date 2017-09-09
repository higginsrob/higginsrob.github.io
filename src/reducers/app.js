import {
    APP_SET,
} from 'actions/app';

const defaultState = {
    ready: true
};

export default function(state=defaultState, action) {
    switch (action.type) {
        case APP_SET:
            return { ...state, [action.payload.key]: action.payload.value };
        default:
            return state;
    }
}
