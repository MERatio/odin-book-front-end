import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import useIsMounted from '../hooks/useIsMounted';
import getData from '../lib/getData';
import NotFoundView from './NotFoundView';
import BootstrapSpinner from '../components/BootstrapSpinner';
import PostCard from '../components/PostCard';
import Comments from '../components/Comments';

function PostsShowView() {
	const { postId } = useParams();
	const isMounted = useIsMounted();

	const [is404, setIs404] = useState(false);
	const [isPostLoading, setIsPostLoading] = useState(true);
	const [post, setPost] = useState({});
	const [totalReactions, setTotalReactions] = useState(undefined);
	const [isInitialCommentsLoading, setIsInitialCommentsLoading] = useState(
		true
	);
	const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
	const [comments, setComments] = useState([]);
	const [totalComments, setTotalComments] = useState(undefined);
	const [hasMoreComments, setHasMoreComments] = useState(false);

	function incrementCurrentCommentsPage() {
		setCurrentCommentsPage(
			(prevCurrentCommentsPage) => prevCurrentCommentsPage + 1
		);
	}

	useEffect(() => {
		if (!isMounted) {
			return;
		}

		async function fetchAndSetPost() {
			try {
				const postResponse = await getData(
					`${process.env.REACT_APP_API_URL}/posts/${postId}`,
					true
				);
				if (postResponse.status === 404) {
					isMounted && setIs404(true);
				}
				const postData = await postResponse.json();
				if (postData.err) {
					window.alerts([{ msg: postData.err.message }]);
				} else {
					isMounted && setPost(postData.post);
				}
			} catch (err) {
				window.alerts([{ msg: err.message }]);
			}
		}

		fetchAndSetPost();
	}, [isMounted, postId]);

	useEffect(() => {
		if (!isMounted || !post._id) {
			return;
		}

		async function fetchAndSetTotalReactions() {
			try {
				const data = await getData(
					`${process.env.REACT_APP_API_URL}/posts/${post._id}/reactions?noDocs=true`
				);
				if (data.err) {
					window.alerts([{ msg: data.err.message }]);
				} else {
					setTotalReactions(data.totalReactions);
				}
			} catch (err) {
				window.alerts([{ msg: err.message }]);
			}
			isMounted && setIsPostLoading(false);
		}

		fetchAndSetTotalReactions();
	}, [isMounted, post]);

	useEffect(() => {
		if (!isMounted || !post._id) {
			return;
		}

		async function fetchAndSetComments() {
			try {
				const data = await getData(
					`${process.env.REACT_APP_API_URL}/posts/${post._id}/comments?page=${currentCommentsPage}&limit=10`
				);
				if (data.err) {
					window.alerts([{ msg: data.err.message }]);
				} else {
					if (isMounted) {
						setComments((prevComments) => prevComments.concat(data.comments));
						setTotalComments(data.totalComments);
					}
				}
			} catch (err) {
				window.alerts([{ msg: err.message }]);
			}
			isMounted &&
				currentCommentsPage === 1 &&
				setIsInitialCommentsLoading(false);
		}

		fetchAndSetComments();
	}, [isMounted, post, currentCommentsPage]);

	useEffect(() => {
		if (!isMounted || typeof totalComments !== 'number') {
			return;
		}
		setHasMoreComments(comments.length < totalComments);
	}, [isMounted, comments, totalComments]);

	return isPostLoading ? (
		<BootstrapSpinner
			type={'border'}
			size={'2em'}
			classes={'position-absolute top-50 start-50 translate-middle'}
		/>
	) : is404 ? (
		<NotFoundView />
	) : (
		<div className="container mt-3">
			<div className="row justify-content-center">
				<section className="col-md-8">
					<PostCard post={{ ...post, totalReactions, totalComments }} />
					{isInitialCommentsLoading ? (
						<div className="position-relative" style={{ minHeight: '10em' }}>
							<BootstrapSpinner
								type={'border'}
								size={'2em'}
								classes={'position-absolute top-50 start-50 translate-middle'}
							/>
						</div>
					) : (
						<InfiniteScroll
							dataLength={comments.length}
							next={incrementCurrentCommentsPage}
							hasMore={hasMoreComments}
							loader={
								<div className="d-flex justify-content-center">
									<BootstrapSpinner type={'border'} size={'2em'} />
								</div>
							}
							style={{ overflow: 'none' }}
						>
							<Comments comments={comments} />
						</InfiniteScroll>
					)}
				</section>
			</div>
		</div>
	);
}

export default PostsShowView;
