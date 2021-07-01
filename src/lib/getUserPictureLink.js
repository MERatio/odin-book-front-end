import getPictureLinkOf from './getPictureLinkOf';
import getGravatarImage from './getGravatarImage';

function getUserPictureLink(user, size = '80', defaultImage = 'mp') {
	const pictureLink = getPictureLinkOf(user);
	const userPictureLink =
		pictureLink === ''
			? getGravatarImage(user.email, size, defaultImage)
			: pictureLink;
	return userPictureLink;
}

export default getUserPictureLink;
