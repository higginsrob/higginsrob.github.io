export const APP_SET = 'APP_SET';

export function appReady () {
    return set('ready', true);
}

function set(key, value) {
    return {
        type: APP_SET,
        payload: {key, value}
    };
}

