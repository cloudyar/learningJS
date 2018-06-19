function route(pathname) {
	console.log('route: ' + pathname);
	var result = 'doing sth at: ' + pathname;
	return result;
}

module.exports.route = route;