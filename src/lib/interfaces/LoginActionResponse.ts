export interface LoginActionResponse {
	generalErr?: string
	nameErr?: string
	usernameErr?: string
	passwordErr?: string
	require2fa?: boolean
}
