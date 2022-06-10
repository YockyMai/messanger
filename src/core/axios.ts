import axios from 'axios';

const jwtToken = localStorage.getItem('token');

//http://localhost:8080/
//https://hiyocky.herokuapp.com/'

const instance = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		token: jwtToken ? jwtToken : '',
		'X-Custom-Header': 'foobar',
	},
});

export default instance;
