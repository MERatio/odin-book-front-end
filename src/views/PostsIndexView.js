import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useIsMounted from '../hooks/useIsMounted';
import getData from '../lib/getData';
import BootstrapSpinner from '../components/BootstrapSpinner';
import PostsCards from '../components/PostsCards';

function PostsIndexView() {
	const isMounted = useIsMounted();

	const [
		isFetchingInitialCurrentPosts,
		setIsFetchingInitialCurrentPosts,
	] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPosts, setCurrentPosts] = useState([]);
	const [totalPostsCount, setTotalPostsCount] = useState(undefined);
	const [hasMore, setHasMore] = useState(false);

	function incrementCurrentPage() {
		setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
	}

	useEffect(() => {
		if (!isMounted) {
			return;
		}

		async function fetchAndSetData() {
			async function fetchData() {
				try {
					return await getData(
						`${
							process.env.REACT_APP_API_URL
						}/posts?page=${currentPage}&limit=${10}`
					);
				} catch (err) {
					window.alerts([{ msg: err.message }]);
				}
			}

			currentPage === 1 && setIsFetchingInitialCurrentPosts(true);
			const data = await fetchData();
			currentPage === 1 && setIsFetchingInitialCurrentPosts(false);
			if (data.err) {
				window.alerts([{ msg: data.err.message }]);
			} else {
				setCurrentPosts((prevCurrentPosts) =>
					prevCurrentPosts.concat(data.currentPosts)
				);
				setTotalPostsCount(data.totalPostsCount);
			}
		}

		fetchAndSetData();
	}, [isMounted, currentPage]);

	useEffect(() => {
		if (!isMounted || typeof totalPostsCount !== 'number') {
			return;
		}
		setHasMore(currentPosts.length < totalPostsCount);
	}, [isMounted, isFetchingInitialCurrentPosts, currentPosts, totalPostsCount]);

	return isFetchingInitialCurrentPosts ? (
		<BootstrapSpinner
			type={'border'}
			size={'2em'}
			classes={'position-absolute top-50 start-50 translate-middle'}
		/>
	) : (
		<div className="container mt-3">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<section>
						<InfiniteScroll
							dataLength={currentPosts.length}
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
							<PostsCards posts={currentPosts} />
						</InfiniteScroll>
					</section>
				</div>
			</div>
		</div>
	);
}

export default PostsIndexView;
