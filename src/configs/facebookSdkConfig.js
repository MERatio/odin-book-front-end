function facebookSdkConfig() {
	/* Facebook SDK is blocked 
	     by blockers (Firefox Tracking Protection, uBlock Origin, etc...).
	   Even if window.FB is set, some resource inside Facebook SDK is blocked too. 
	   Therefore crashing the app (can't try catch).
	*/

	// Facebook SDK call this function automatically (with delay).
	window.fbAsyncInit = function () {
		window.FB.init({
			appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`,
			cookie: true,
			xfbml: true,
			version: 'v10.0',
		});

		window.FB.AppEvents.logPageView();
	};

	// Insert Facebook SDK.
	(function (d, s, id) {
		var js,
			fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = 'https://connect.facebook.net/en_US/sdk.js';
		fjs.parentNode.insertBefore(js, fjs);
	})(document, 'script', 'facebook-jssdk');
}

export default facebookSdkConfig;
