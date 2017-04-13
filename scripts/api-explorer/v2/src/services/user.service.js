const USER_ROLES = {
	INTERNAL: "Internal User"
};

/**
 * get user roles list
 * @returns {Array}
 */
function getUserRoles () {
	return apiKeyService.getApiKeysCookie("tk-user-roles") || [];
}

/**
 * Check is user has role
 * @param {string} role
 * @returns {boolean}
 */
function checkRole (role) {
	return getUserRoles().indexOf(role) !== -1;
}

/**
 * Check is user has "Internal User" role
 * @returns {boolean}
 */
export function isInternalUser () {
	return checkRole(USER_ROLES.INTERNAL);
}
