import getGravatarImage from './getGravatarImage';

function getUserPicture(currentUser, size = '80', defaultImage = 'mp') {
	const picture = currentUser.picture;
	const currentUserPicture = picture.isLocal
		? picture.filename === ''
			? getGravatarImage(currentUser.email, size, defaultImage)
			: `${process.env.REACT_APP_API_URL}/images/${picture.filename}`
		: picture.filename;

	return currentUserPicture;
}

export default getUserPicture;
