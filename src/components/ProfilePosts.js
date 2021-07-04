import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import BootstrapSpinner from './BootstrapSpinner';
import PostsCards from './PostsCards';

function ProfilePosts({ posts, hasMore, incrementCurrentPage }) {
	return (
		<section className="position-relative profile-posts">
			<InfiniteScroll
				dataLength={posts.length}
				next={incrementCurrentPage}
				hasMore={hasMore}
				loader={
					<div className="d-flex justify-content-center">
						<BootstrapSpinner type={'border'} size={'2em'} />
					</div>
				}
				style={{ overflow: 'none' }}
			>
				<PostsCards posts={posts} />
			</InfiniteScroll>
		</section>
	);
}

ProfilePosts.propTypes = {
	posts: PropTypes.array.isRequired,
	hasMore: PropTypes.bool.isRequired,
	incrementCurrentPage: PropTypes.func.isRequired,
};

export default ProfilePosts;
