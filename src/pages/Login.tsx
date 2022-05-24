import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import eyeOpenImg from '../assets/img/eyeOpen.svg';
import eyeCloseImg from '../assets/img/eyeClose.svg';
import okImg from '../assets/img/ok.svg';
import xnoneImg from '../assets/img/x-non.svg';

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
		.passBlock {
			position: relative;
		}
	}
`;

const ValidateMsg = styled.p<{
	validPass?: boolean | null;
	validName?: boolean | null;
}>`
	color: ${props =>
		props.validPass || props.validName ? '#7BF996' : '#e25c5c'};
	position: absolute;
	display: flex;
	align-items: center;
	padding-left: 10px;
	padding-top: 5px;
	img {
		width: 20px;
		margin-right: 5px;
	}
`;

const ViewPass = styled.img`
	position: absolute;
	top: 50%;
	right: -35px;
	transform: translateY(-50%);
	cursor: pointer;
	color: #fff;
	width: 25px;
`;

export const Login = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [openPass, setOpenPass] = React.useState(false);

	const [validName, setValidName] = React.useState<null | boolean>(null);
	const [validPass, setValidPass] = React.useState<null | boolean>(null);

	const routeLocation = useLocation(); // current route value

	const [validateUsernameMsg, setValidateUsernameMsg] = React.useState('');
	const [validatePassMsg, setValidatePassMsg] = React.useState('');

	React.useEffect(() => {
		if (validName !== null) {
			if (username.length <= 8) {
				setValidateUsernameMsg(
					'Username must be more than \n6 characters',
				);
				setValidName(false);
			} else {
				setValidateUsernameMsg('Username OK');
				setValidName(true);
			}
		}
	}, [username, validName]);

	React.useEffect(() => {
		if (validPass !== null) {
			if (password.length <= 8) {
				setValidatePassMsg('Username must be more than \n6 characters');
				setValidPass(false);
			} else if (password[0].toUpperCase() !== password[0]) {
				setValidatePassMsg('Password must start with a capital letter');
				setValidPass(false);
			} else {
				setValidPass(true);
				setValidatePassMsg('Password OK');
			}
		}
	}, [password, validPass]);

	const logIn = () => {
		setValidName(false);
		setValidPass(false);
	};

	const register = () => {
		setValidName(false);
		setValidPass(false);
	};
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
					<h1 className="header">
						{routeLocation.pathname == '/login'
							? 'Log In'
							: 'Registration'}
					</h1>
					<div className="">
						<Input
							placeholder="Username"
							type="text"
							value={username}
							setValue={setUsername}
							width={'300px'}
						/>
						<ValidateMsg validName={validName}>
							{validName !== null && (
								<>
									<img src={validName ? okImg : xnoneImg} />
									{validateUsernameMsg}
								</>
							)}
						</ValidateMsg>
					</div>

					<div className="">
						<div className="passBlock">
							<Input
								placeholder="Password"
								type={openPass ? 'text' : 'password'}
								value={password}
								setValue={setPassword}
								width={'300px'}
							/>
							<ViewPass
								onClick={() => setOpenPass(!openPass)}
								src={openPass ? eyeOpenImg : eyeCloseImg}
							/>
						</div>

						<ValidateMsg validPass={validPass}>
							{validName !== null && (
								<>
									<img src={validPass ? okImg : xnoneImg} />
									{validatePassMsg}
								</>
							)}
						</ValidateMsg>
					</div>

					{routeLocation.pathname == '/login' ? (
						<Button onClick={logIn}>LOG IN</Button>
					) : (
						<Button onClick={register}>SIGN UP</Button>
					)}

					{routeLocation.pathname == '/login' ? (
						<p>
							Don't have an account yet?{' '}
							<Link to="/registration">Register</Link>
						</p>
					) : (
						<p>
							Already have an account?{' '}
							<Link to="/login">Login</Link>
						</p>
					)}
				</LoginForm>
			</div>
		</LoginWraper>
	);
};
