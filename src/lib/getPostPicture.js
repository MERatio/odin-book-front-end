function getUserPicture(post) {
	const picture = post.picture;
	const postPicture = picture.isLocal
		? picture.filename === ''
			? ''
			: `${process.env.REACT_APP_API_URL}/images/${picture.filename}`
		: picture.filename;
	return postPicture;
}

export default getUserPicture;
