import getGravatarImage from './getGravatarImage';

function getProfilePicture(currentUser, size = '80', defaultImage = 'mp') {
	const currentUserProfilePicture =
		currentUser.provider === 'local'
			? currentUser.profilePicture.filename === ''
				? getGravatarImage(currentUser.email, size, defaultImage)
				: currentUser.profilePicture.filename
			: currentUser.profilePicture.filename;

	return currentUserProfilePicture;
}

export default getProfilePicture;
