import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'https://mainapi.springfest.in',
});