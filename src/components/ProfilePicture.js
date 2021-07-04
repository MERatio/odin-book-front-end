import PropTypes from 'prop-types';
import getUserPictureLink from '../lib/getUserPictureLink';

function ProfilePicture({ user }) {
	return (
		<div className="profile-picture-container">
			<img
				src={getUserPictureLink(user)}
				alt="User"
				className="img-thumbnail profile-picture"
			/>
		</div>
	);
}

ProfilePicture.propTypes = {
	user: PropTypes.object.isRequired,
};

export default ProfilePicture;
