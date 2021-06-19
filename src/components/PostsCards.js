import PropTypes from 'prop-types';
import PostCard from './PostCard';

function PostsCards({ posts }) {
	const postsCards = posts.map((post) => (
		<PostCard key={post._id} post={post} />
	));

	return <>{postsCards}</>;
}

PostsCards.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostsCards;
