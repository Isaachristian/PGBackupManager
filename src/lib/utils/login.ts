export function validatePassword(password: string): string | undefined {
	if (password.length < 8) return 'Password must be at least 8 characters'

	const upperCaseTest = /[A-Z]/g
	if (!upperCaseTest.test(password)) return 'Password must include at least one uppercase letter'

	const lowerCaseTest = /[a-z]/g
	if (!lowerCaseTest.test(password)) return 'Password must include at least one lowercase letter'

	const numberTest = /[0-9]/g
	if (!numberTest.test(password)) return 'Password must include at least one number'

	const specialCharacterTest = /\W|_/g
	if (!specialCharacterTest.test(password))
		return 'Password must include at least one special character or underscore'

	return undefined // no error
}
