import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import getUserFullName from '../lib/getUserFullName';
import getUserPictureLink from '../lib/getUserPictureLink';

function ProfileFriends({ userId, friends, totalFriends }) {
	return (
		<div className="position-relative profile-friends">
			<h2 className="h4 ms-4 ms-md-0 mb-4 mb-md-2">
				<Link to={`/users/${userId}/friends`}>
					{pluralize('friend', totalFriends || 0, true)}
				</Link>
			</h2>
			<div className="text-center d-none d-md-grid profile-friends-grid">
				{friends.slice(0, 9).map((friend) => {
					const userFullName = getUserFullName(friend);
					return (
						<Link
							to={`/users/${friend._id}`}
							key={friend._id}
							className="profile-friends-grid-item"
						>
							<figure className="mb-0">
								<div className="profile-friends-grid-item-image-container">
									<img
										src={getUserPictureLink(friend)}
										alt={userFullName}
										className="img-fluid profile-friends-grid-item-image"
									/>
								</div>
								<figcaption>{userFullName}</figcaption>
							</figure>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

ProfileFriends.propTypes = {
	userId: PropTypes.string.isRequired,
	friends: PropTypes.array.isRequired,
	totalFriends: PropTypes.number.isRequired,
};

export default ProfileFriends;
