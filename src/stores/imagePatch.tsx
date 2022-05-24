import { makeAutoObservable } from 'mobx';

class ImagePatch {
	imagePatch = '';
	flag = false;
	constructor() {
		makeAutoObservable(this);
	}

	setImagePatch(src: string) {
		this.imagePatch = src;
		this.flag = true;
	}
	removeImagePatch() {
		this.imagePatch = '';
		this.flag = false;
	}
}

export default new ImagePatch();
