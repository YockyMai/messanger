import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const From = styled.form`
	position: absolute;
	left: 50%;
	top: 20%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	padding: 100px;
	background-color: #1c1d2c;
	border-radius: 3em;
	align-items: center;
	.header {
		font-weight: 300;
		margin-bottom: 20px;
	}
	input {
		margin-bottom: 20px;
	}
`;

export const Registration = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<From>
			<h1 className="header">Registration</h1>
			<Input
				placeholder="Username"
				type="text"
				value={username}
				setValue={setUsername}
				width={'300px'}
			/>
			<Input
				placeholder="Password"
				type="password"
				value={password}
				setValue={setPassword}
				width={'300px'}
			/>
			<Button>SIGN UP</Button>
			<br />
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</From>
	);
};
