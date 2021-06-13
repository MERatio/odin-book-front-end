import md5 from 'crypto-js/md5';

function getGravatarImage(email, size = '80', defaultImage = 'mp') {
	const hash = md5(email);
	const url = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;
	return url;
}

export default getGravatarImage;
