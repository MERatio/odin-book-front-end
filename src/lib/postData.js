async function postData(url = '', data = {}, getResponse = false) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
		body: JSON.stringify(data),
	});
	return getResponse ? response : response.json();
}

export default postData;
