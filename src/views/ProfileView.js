import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useIsMounted from '../hooks/useIsMounted';
import getData from '../lib/getData';
import getUserFullName from '../lib/getUserFullName';
import NotFoundView from './NotFoundView';
import BootstrapSpinner from '../components/BootstrapSpinner';
import ProfilePicture from '../components/ProfilePicture';
import ProfileFriends from '../components/ProfileFriends';
import ProfilePosts from '../components/ProfilePosts';

import '../css/ProfileView.scss';

function ProfileView(props) {
	const { userId } = useParams();
	const isMounted = useIsMounted();

	const [is404, setIs404] = useState(false);
	const [isUserLoading, setIsUserLoading] = useState(true);
	const [user, setUser] = useState({});
	const [isFriendsLoading, setIsFriendsLoading] = useState(true);
	const [friends, setFriends] = useState([]);
	const [totalFriends, setTotalFriends] = useState(undefined);
	const [isInitialPostsLoading, setIsInitialPostsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(undefined);
	const [hasMore, setHasMore] = useState(false);

	function incrementCurrentPage() {
		setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
	}

	// isMounted && setState() prevent memory leak warning
	// if user leaves the page when there's an async task.

	useEffect(() => {
		async function fetchAndSetUser() {
			async function fetchResponse() {
				try {
					return await getData(
						`${process.env.REACT_APP_API_URL}/users/${userId}`,
						true
					);
				} catch (err) {
					isMounted && setIsUserLoading(false);
					window.alerts([{ msg: err.message }]);
				}
			}

			const response = await fetchResponse();
			if (response.status === 404) {
				isMounted && setIs404(true);
			} else {
				const data = await response.json();
				if (data.err) {
					window.alerts([{ msg: data.err.message }]);
				} else {
					isMounted && setUser(data.user);
				}
			}
			isMounted && setIsUserLoading(false);
		}

		// Function called twice without isMounted.
		// Function is called twice because of isMounted changing value from false to true).
		isMounted && fetchAndSetUser();
	}, [isMounted, userId]);

	useEffect(() => {
		if (!user._id) {
			return;
		}

		async function fetchAndSetFriends() {
			async function fetchData() {
				try {
					return await getData(
						`${process.env.REACT_APP_API_URL}/users/${user._id}/friends?page=1&limit=10`
					);
				} catch (err) {
					isMounted && setIsFriendsLoading(false);
					window.alerts([{ msg: err.message }]);
				}
			}

			const data = await fetchData();
			if (data.err) {
				window.alerts([{ msg: data.err.message }]);
			} else {
				if (isMounted) {
					setFriends(data.users);
					setTotalFriends(data.totalUsers);
				}
			}
			isMounted && setIsFriendsLoading(false);
		}

		fetchAndSetFriends();
	}, [isMounted, user]);

	useEffect(() => {
		if ((isMounted, !user._id)) {
			return;
		}

		async function fetchAndSetPosts() {
			async function fetchData() {
				try {
					return await getData(
						`${process.env.REACT_APP_API_URL}/users/${user._id}/posts?page=${currentPage}&limit=10`
					);
				} catch (err) {
					isMounted && currentPage === 1 && setIsInitialPostsLoading(false);
					window.alerts([{ msg: err.message }]);
				}
			}
			const data = await fetchData();
			if (data.err) {
				window.alerts([{ msg: data.err.message }]);
				return;
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
							reactions: reactionsData.reactions,
							comments: commentsData.comments,
						};
					})
				);
				if (isMounted) {
					setPosts((prevPosts) => prevPosts.concat(posts));
					setTotalPosts(data.totalPosts);
				}
			}
			isMounted && currentPage === 1 && setIsInitialPostsLoading(false);
		}

		fetchAndSetPosts();
	}, [isMounted, user, currentPage]);

	useEffect(() => {
		if (typeof totalPosts !== 'number') {
			return;
		}
		isMounted && console.log('hasMore');
		isMounted && setHasMore(posts.length < totalPosts);
	}, [isMounted, posts, totalPosts]);

	return isUserLoading ? (
		<BootstrapSpinner
			type={'border'}
			size={'2em'}
			classes={'position-absolute top-50 start-50 translate-middle'}
		/>
	) : is404 ? (
		<NotFoundView />
	) : (
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-4">
					<ProfilePicture user={user} />
					<h1 className="text-center">{getUserFullName(user)}</h1>
					{isFriendsLoading ? (
						<div className="position-relative" style={{ minHeight: '10em' }}>
							<BootstrapSpinner
								type={'border'}
								size={'2em'}
								classes={'position-absolute top-50 start-50 translate-middle'}
							/>
						</div>
					) : (
						<ProfileFriends
							userId={user._id}
							friends={friends}
							totalFriends={totalFriends}
						/>
					)}
				</div>
				<div className="col-md-8">
					{isInitialPostsLoading ? (
						<div className="position-relative" style={{ minHeight: '10em' }}>
							<BootstrapSpinner
								type={'border'}
								size={'2em'}
								classes={'position-absolute top-50 start-50 translate-middle'}
							/>
						</div>
					) : (
						<ProfilePosts
							posts={posts}
							hasMore={hasMore}
							incrementCurrentPage={incrementCurrentPage}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProfileView;
