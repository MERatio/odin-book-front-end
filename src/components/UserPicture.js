import PropTypes from 'prop-types';
import getUserPictureLink from '../lib/getUserPictureLink';

function UserPicture({ user }) {
	return (
		<div className="user-picture-container">
			<img
				src={getUserPictureLink(user)}
				alt="User"
				className="img-thumbnail user-picture"
			/>
		</div>
	);
}

UserPicture.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserPicture;
