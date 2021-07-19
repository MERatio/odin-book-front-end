import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import getUserFullName from '../lib/getUserFullName';
import getUserPictureLink from '../lib/getUserPictureLink';

function UserFriends({ userId, friends, totalFriends }) {
	return (
		<div className="position-relative user-friends">
			<h2 className="h4 ms-4 ms-md-0 mb-4 mb-md-2">
				<Link to={`/users/${userId}/friends`}>
					{pluralize('friend', totalFriends || 0, true)}
				</Link>
			</h2>
			<div className="text-center d-none d-md-grid user-friends-grid">
				{friends.slice(0, 9).map((friend) => {
					const userFullName = getUserFullName(friend);
					return (
						<Link
							to={`/users/${friend._id}`}
							key={friend._id}
							className="user-friends-grid-item"
						>
							<figure className="mb-0">
								<div className="user-friends-grid-item-image-container">
									<img
										src={getUserPictureLink(friend)}
										alt={userFullName}
										className="img-fluid user-friends-grid-item-image"
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

UserFriends.propTypes = {
	userId: PropTypes.string.isRequired,
	friends: PropTypes.array.isRequired,
	totalFriends: PropTypes.number.isRequired,
};

export default UserFriends;
