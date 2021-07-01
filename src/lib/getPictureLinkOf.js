function getPictureLinkOf(resource) {
	const picture = resource.picture;
	const pictureLink = picture.isLocal
		? picture.filename === ''
			? ''
			: `${process.env.REACT_APP_API_URL}/images/${picture.filename}`
		: picture.filename;
	return pictureLink;
}

export default getPictureLinkOf;
