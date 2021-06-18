async function postMultipartData(url = '', formData = {}, getResponse = false) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
		body: formData,
	});
	return getResponse ? response : response.json();
}

export default postMultipartData;
