import axios from 'axios';

const jwtToken = localStorage.getItem('token');

//http://localhost:8080/

const instance = axios.create({
	baseURL: 'https://hiyocky.herokuapp.com/',
	headers: {
		token: jwtToken ? jwtToken : '',
		'X-Custom-Header': 'foobar',
	},
});

export default instance;
