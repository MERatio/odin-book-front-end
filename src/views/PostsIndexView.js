import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useIsMounted from '../hooks/useIsMounted';
import getData from '../lib/getData';
import BootstrapSpinner from '../components/BootstrapSpinner';
import PostsCards from '../components/PostsCards';

function PostsIndexView() {
	const isMounted = useIsMounted();

	const [isInitialPostsLoading, setIsInitialPostsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(undefined);
	const [hasMore, setHasMore] = useState(false);

	function incrementCurrentPage() {
		setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
	}

	useEffect(() => {
		if (!isMounted) {
			return;
		}

		async function fetchAndSetPosts() {
			try {
				isMounted && currentPage === 1 && setIsInitialPostsLoading(true);
				const data = await getData(
					`${process.env.REACT_APP_API_URL}/posts?page=${currentPage}&limit=10`
				);
				if (data.err) {
					window.alerts([{ msg: data.err.message }]);
				} else {
					const posts = await Promise.all(
						data.posts.map(async (post) => {
							const reactionsData = await getData(
								`${process.env.REACT_APP_API_URL}/posts/${post._id}/reactions`
							);
							if (reactionsData.err) {
								window.alerts([{ msg: reactionsData.err.message }]);
								return;
							}
							const commentsData = await getData(
								`${process.env.REACT_APP_API_URL}/posts/${post._id}/comments`
							);
							if (commentsData.err) {
								window.alerts([{ msg: commentsData.err.message }]);
								return;
							}
							return {
								...post,
								totalReactions: reactionsData.totalReactions,
								totalComments: commentsData.totalComments,
							};
						})
					);
					if (isMounted) {
						setPosts((prevPosts) => prevPosts.concat(posts));
						setTotalPosts(data.totalPosts);
					}
				}
			} catch (err) {
				window.alerts([{ msg: err.message }]);
			}
			isMounted && currentPage === 1 && setIsInitialPostsLoading(false);
		}

		fetchAndSetPosts();
	}, [isMounted, currentPage]);

	useEffect(() => {
		if (!isMounted || typeof totalPosts !== 'number') {
			return;
		}
		setHasMore(posts.length < totalPosts);
	}, [isMounted, posts, totalPosts]);

	return isInitialPostsLoading ? (
		<BootstrapSpinner
			type={'border'}
			size={'2em'}
			classes={'position-absolute top-50 start-50 translate-middle'}
		/>
	) : (
		<div className="container mt-3">
			<div className="row justify-content-center">
				<section className="col-md-8">
					<InfiniteScroll
						dataLength={posts.length}
						next={incrementCurrentPage}
						hasMore={hasMore}
						loader={
							<div className="d-flex justify-content-center">
								<BootstrapSpinner type={'border'} size={'2em'} />
							</div>
						}
						/* This div's scrollbar flickers if loader is BootstrapSpinner
								 with size bigger than 1em (I only test for 1em).
								 Setting overflow to none fix the problem.
							*/
						style={{ overflow: 'none' }}
					>
						<PostsCards posts={posts} />
					</InfiniteScroll>
				</section>
			</div>
		</div>
	);
}

export default PostsIndexView;
