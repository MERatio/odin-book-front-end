import { useParams } from 'react-router-dom';

function UsersShowView() {
	let { userId } = useParams();

	return (
		<>
			<h1>TODO: UsersShowView</h1>
			<h2>{userId}</h2>
		</>
	);
}

export default UsersShowView;
