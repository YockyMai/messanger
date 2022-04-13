import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Animation = styled.div`
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	overflow: hidden;
	.view {
		transform: scale(2);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		perspective: 400;
	}

	.plane {
		width: 120px;
		height: 120px;
		transform-style: preserve-3d;
	}
	.plane.main {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform: rotateX(60deg) rotateZ(-30deg);
		-webkit-animation: rotate 20s infinite linear;
		animation: rotate 20s infinite linear;
	}
	.plane.main .circle {
		width: 120px;
		height: 120px;
		position: absolute;
		transform-style: preserve-3d;
		border-radius: 100%;
		box-sizing: border-box;
		box-shadow: 0 0 60px crimson, inset 0 0 60px crimson;
	}
	.plane.main .circle::before,
	.plane.main .circle::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 10%;
		height: 10%;
		border-radius: 100%;
		background: crimson;
		box-sizing: border-box;
		box-shadow: 0 0 60px 2px crimson;
	}
	.plane.main .circle::before {
		transform: translateZ(-90px);
	}
	.plane.main .circle::after {
		transform: translateZ(90px);
	}
	.plane.main .circle:nth-child(1) {
		transform: rotateZ(72deg) rotateX(63.435deg);
	}
	.plane.main .circle:nth-child(2) {
		transform: rotateZ(144deg) rotateX(63.435deg);
	}
	.plane.main .circle:nth-child(3) {
		transform: rotateZ(216deg) rotateX(63.435deg);
	}
	.plane.main .circle:nth-child(4) {
		transform: rotateZ(288deg) rotateX(63.435deg);
	}
	.plane.main .circle:nth-child(5) {
		transform: rotateZ(360deg) rotateX(63.435deg);
	}

	@-webkit-keyframes rotate {
		0% {
			transform: rotateX(0) rotateY(0) rotateZ(0);
		}
		100% {
			transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
		}
	}

	@keyframes rotate {
		0% {
			transform: rotateX(0) rotateY(0) rotateZ(0);
		}
		100% {
			transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
		}
	}
`;

const LoginForm = styled.form`
	margin-top: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 40%;
`;

const LoginWraper = styled.div`
	display: grid;
	height: 100vh;
	grid-template-columns: 3fr 1fr;
	.loginform-container {
		height: 100%;
		background-color: #1c1d2c;
	}
`;

export const Login = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	return (
		<LoginWraper>
			<Animation>
				<div className="view">
					<div className="plane main">
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
					</div>
				</div>
			</Animation>
			<div className="loginform-container">
				<LoginForm>
					<h1 className="header">Log In</h1>
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
					<Button>LOG IN</Button>
					<p>
						Don't have an account yet?{' '}
						<Link to="/registration">Register</Link>
					</p>
				</LoginForm>
			</div>
		</LoginWraper>
	);
};
