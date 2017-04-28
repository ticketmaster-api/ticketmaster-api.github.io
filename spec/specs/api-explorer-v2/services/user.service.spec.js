import { isInternalUser } from 'scripts/api-explorer/v2/src/services/user.service'

describe('API Explorer User service', function () {
	const internalUserRoles = ["authenticated user","Drupal Administrator","Content Admin","groupon","Content API user","Purchase API user","API Terms user","Internal User"];
	const nonInternalUserRoles = ["authenticated user","Drupal Administrator","Content Admin","groupon","Content API user","Purchase API user","API Terms user"];
	var currentUserRolesMock;
	beforeEach(() => {
		global.apiKeyService = {
			getApiKeysCookie: jest.fn(()=> currentUserRolesMock)
		};
	});

	describe('When isInternalUser method called', () => {
		it('should call getApiKeysCookie method for get user role', () => {
			isInternalUser();
			expect(global.apiKeyService.getApiKeysCookie).toBeCalledWith('tk-user-roles');

		});
	});

	describe('When user not logged in', () => {
		beforeEach(() => {
			currentUserRolesMock = undefined;
		});

		it('should detect user as non internal ', () => {
			expect(isInternalUser()).toBeFalsy();
		});
	});

	describe('When user logged in and has "Internal User" role', () => {
		beforeEach(() => {
			currentUserRolesMock = internalUserRoles;
		});

		it('should detect user as internal ', () => {
			expect(isInternalUser()).toBeTruthy();
		});
	});

	describe('When user logged in and not have "Internal User" role', () => {
		beforeEach(() => {
			currentUserRolesMock = nonInternalUserRoles;
		});

		it('should detect user as non internal ', () => {
			expect(isInternalUser()).toBeFalsy();
		});
	});
});
