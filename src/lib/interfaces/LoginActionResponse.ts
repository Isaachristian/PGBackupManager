export interface LoginActionResponse {
	setup?: boolean // user does not exist, go to setup
	generalErr?: string
	nameErr?: string
	usernameErr?: string
	passwordErr?: string
	require2fa?: boolean
}
