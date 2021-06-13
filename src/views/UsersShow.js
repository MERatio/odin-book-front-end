import { useParams } from 'react-router-dom';

function UsersShow() {
	let { userId } = useParams();

	return (
		<>
			<h1>TODO: UsersShow</h1>
			<h2>{userId}</h2>
		</>
	);
}

export default UsersShow;
