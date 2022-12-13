import {callApi} from 'app/api';

export const ping = () => callApi('/ping');
