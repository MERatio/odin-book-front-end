import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import pluralize from 'pluralize';
import getPictureLinkOf from '../lib/getPictureLinkOf';

function PostCard({ post }) {
	const postPicture = getPictureLinkOf(post);

	return (
		<article className="card mb-3">
			<div className="card-header">
				<h5 className="card-title">{post.title}</h5>
				<p className="card-subtitle mb-2">
					{post.author.firstName + ' ' + post.author.lastName}
				</p>
				<p className="card-subtitle">
					{format(new Date(post.updatedAt), 'PPpp')}
				</p>
			</div>
			{postPicture && (
				<Link to={`/posts/${post._id}`}>
					<img
						src={postPicture}
						className="card-img-top post-image"
						alt="Post"
					/>
				</Link>
			)}
			<div className="card-body">
				<p className="card-text">{post.text}</p>
				<Link to={`/posts/${post._id}/reactions`} className="card-link">
					{post.reactions.length} reactions
				</Link>
				<Link to={`/posts/${post._id}`} className="card-link">
					{pluralize('comments', post.comments.length, true)}
				</Link>
			</div>
		</article>
	);
}

PostCard.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostCard;
