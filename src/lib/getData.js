async function getData(url = '') {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return response.json();
}

export default getData;
