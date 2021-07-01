async function getData(url = '', getResponse = false) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return getResponse ? response : response.json();
}

export default getData;
