import axios from 'axios';
import { STUB_PORT } from './commonConst';

/**
 * This function is used to genrate base url using global
 * window locations
 * @returns string as base URL
 */
const genrateBaseUrl = () => {
    const { hostname, protocol, port } = window.location;
    if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
        return protocol + '//' + hostname + ':' + STUB_PORT;
    } else if (process.env.NODE_ENV == 'production') {
        if (port && port != '') {
            //This condition is useful when we deploy app locally and using stub server
            if (hostname && hostname == 'localhost') {
                return protocol + '//' + hostname + ':' + STUB_PORT;
            } else {
                return protocol + '//' + hostname + ':' + port;
            }
        } else {
            return protocol + '//' + hostname;
        }
    }
};

export const axiosInstance = axios.create({
    baseURL: genrateBaseUrl(),
});
