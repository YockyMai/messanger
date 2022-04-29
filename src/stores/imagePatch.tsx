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
		console.log(this.imagePatch);
	}
	removeImagePatch() {
		this.imagePatch = '';
		this.flag = false;
		console.log(this.imagePatch);
	}
}

export default new ImagePatch();
