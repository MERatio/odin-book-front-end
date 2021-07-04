function getUserFullName(user) {
	return !user || !user._id ? '' : user.firstName + ' ' + user.lastName;
}

export default getUserFullName;
