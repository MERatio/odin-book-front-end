import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import pluralize from 'pluralize';
import getPictureLinkOf from '../lib/getPictureLinkOf';
import '../css/PostCard.css';

function PostCard({ post }) {
	const postPicture = getPictureLinkOf(post);
	const authorPicture = getPictureLinkOf(post.author);

	return (
		<article className="card mb-3">
			<div className="d-flex align-items-center p-3 pb-2">
				<Link to={`/users/${post.author._id}`}>
					<img
						src={authorPicture}
						className="img-fluid rounded-circle me-2 author-picture"
						alt="Post author"
					/>
				</Link>
				<div>
					<Link
						to={`/users/${post.author._id}`}
						className="text-dark fw-bold h5 author-link"
					>
						{post.author.firstName + ' ' + post.author.lastName}
					</Link>
					<p className="card-subtitle">
						{format(new Date(post.updatedAt), 'PPpp')}
					</p>
				</div>
			</div>
			<div className="px-3 pb-2">
				<p className="mb-0">{post.text}</p>
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
			<div className="p-3">
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
