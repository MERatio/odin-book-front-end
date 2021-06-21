import { useState, useEffect } from 'react';
import useIsMounted from '../hooks/useIsMounted';
import useQuery from '../hooks/useQuery';
import getData from '../lib/getData';
import BootstrapSpinner from '../components/BootstrapSpinner';
import PostsCards from '../components/PostsCards';
import Pagination from '../components/Pagination';

function Posts() {
	const isMounted = useIsMounted();
	const query = useQuery();

	const [currentPage, setCurrentPage] = useState(null);
	const [postsLimit, setPostsLimit] = useState(null);
	const [isFetchingData, setIsFetchingData] = useState(false);
	const [currentPosts, setCurrentPosts] = useState([]);
	const [pagesCount, setPagesCount] = useState(0);

	useEffect(() => {
		if (!isMounted) {
			return;
		}
		const page = parseInt(query.get('page'), 10) || 1;
		const limit = parseInt(query.get('limit'), 10) || 10;
		if (page !== currentPage || limit !== postsLimit) {
			setCurrentPage(page < 1 ? 1 : page);
			setPostsLimit(limit < 10 ? 10 : limit);
		}
	}, [isMounted, query, currentPage, postsLimit]);

	useEffect(() => {
		if (!isMounted || currentPage === null || postsLimit === null) {
			return;
		}
		async function fetchAndSetData() {
			async function fetchData() {
				try {
					const data = await getData(
						`${process.env.REACT_APP_API_URL}/posts?page=${currentPage}&limit=${postsLimit}`
					);
					if (data.err) {
						window.alerts([{ msg: data.err.message }]);
					} else {
						return data;
					}
				} catch (err) {
					window.alerts([{ msg: err.message }]);
				}
			}

			setIsFetchingData(true);
			const data = await fetchData();
			setIsFetchingData(false);
			if (!data.err) {
				setCurrentPosts(data.currentPosts);
				setPagesCount(Math.ceil(data.totalPostsCount / postsLimit));
			}
		}
		fetchAndSetData();
	}, [isMounted, currentPage, postsLimit]);

	return isFetchingData ? (
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
						<PostsCards posts={currentPosts} />
					</section>
					{currentPosts.length > 0 && pagesCount > 1 && (
						<Pagination
							route={'/posts'}
							currentPage={currentPage}
							itemsLimit={postsLimit}
							pagesCount={pagesCount}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Posts;
