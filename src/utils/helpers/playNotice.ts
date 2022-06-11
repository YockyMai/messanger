import noticeSound from '../../assets/sounds/notice.mp3';

const notice = new Audio();
notice.src = noticeSound;

export default () => {
	notice.play();
};
