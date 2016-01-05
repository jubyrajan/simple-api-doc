var authTokenParam = {
	name: 'auth_token',
	description: 'Authentication token obtained during user registration. Mandatory for mobile app users. Not required for web app users.',
	type: 'string',
	mandatory: true
};

var config = {
	categories: [
		{
			title: 'User',
			apis: [
				{
					httpMethod: 'post',
					url: '/registerUser',
					description: 'Register new user',
					parameters: [
						{
							name: 'mobile',
							description: 'Mobile number of the user',
							type: 'string',
							mandatory: true
						},
						{
							name: 'email',
							description: 'Email of the user',
							type: 'string',
							mandatory: true
						},
						{
							name: 'fullName',
							description: 'Full name of the user. Need not be unique.',
							type: 'string',
							mandatory: true
						},
						{
							name: 'userName',
							description: 'Login name to authenticate web user, should be unique. Not required for mobile app users.',
							type: 'string',
							mandatory: false
						},
						{
							name: 'password',
							description: 'Password to authenticate web user. Not required for mobile app users.',
							type: 'string',
							mandatory: false
						}
					],
					responses: [
						{
							responseCode: 200,
							result: 'Registration Successful',
							responseBody: {
								data: 'auth token string',
								statusCode: 200,
								statusMessage: 'User registration successful'
							} 
						},
						{
							responseCode: 400,
							result: 'User with mobile number or email already exists',
							responseBody: {
								statusCode: 400, 
								statusMessage: 'User with mobile number or email already exists'
							}
						},
						{
							responseCode: 400,
							result: 'User with name aleady exists',
							responseBody: {
								statusCode: 400, 
								statusMessage: 'User with name aleady exists'
							}
						}
					]
				},
				{
					httpMethod: 'post',
					url: '/authenticateUser',
					description: 'Authenticate user',
					parameters: [
						{
							name: 'user_name',
							description: 'User login name',
							type: 'string',
							mandatory: true
						},
						{
							name: 'password',
							description: 'User login password',
							type: 'string',
							mandatory: true
						}
					],
					responses: [
						{
							responseCode: 200,
							result: 'User authentication successful',
							responseBody: {
								statusCode: 200,
								data: {
									valid: 'true',
									userRecordId: 'Internal record_id of user',
									loginName: 'User login name',
									fullName: 'User full name',
									sessionId: 'Session Id',
									userId: 'User Id'
								}
							}
						},
						{
							responseCode: 400,
							result: 'User authentication not successful',
							responseBody: {
								statusCode: 400,
								data: {
									valid: 'false'
								}
							}
						}
					]
				},
				{
					httpMethod: 'post',
					url: '/logoutUser',
					description: 'Logout already authenticated user; uses session id from cookie to identify user'
				},
				{
					httpMethod: 'get',
					url: '/userDetail',
					description: 'Get user details',
					parameters: [
						authTokenParam,
						{
							name: 'record_id',
							description: 'Record Id of user',
							type: 'string',
							mandatory: true
						}
					],
					responses: [
						{
							responseCode: 200,
							result: 'User detail',
							responseBody: {
								statusCode: 200,
								data: {
									record_id: 'user record id'
								}
							}
						}
					]
				},
				{
					httpMethod: 'delete',
					url: '/deleteUser',
					description: 'Delete a user',
					parameters: [
						authTokenParam,
						{
							name: 'record_id',
							description: 'Record Id of user to be deleted',
							type: 'string',
							mandatory: true
						}
					],
					responses: [
						{
							responseCode: 200,
							result: 'User deleted successfully',
							responseBody: {
								statusCode: 200,
								data: {
									message: 'User deleted successfully'
								}
							}
						},
						{
							responseCode: 400,
							result: 'User with given id does not exist',
							responseBody: {
								statusCode: 400,
								data: {
									message: 'User with given id does not exist'
								}
							}
						}
					]
				}
			]
		},
		{
			title: 'Message',
			apis: [
				{
					httpMethod: 'get',
					url: '/userMessages',
					description: 'Get messages for user',
					parameters: [
						authTokenParam
					],
					responses: [
						{
							responseCode: 200,
							result: 'List of messages for user',
							responseBody: {
								statusCode: 200,
								data: [
									{messageId: 'messageId1', messageTimeStamp: 'when message was sent', from: 'who send the message', message: 'message text'}
								]
							}
						}
					]
				},
				{
					httpMethod: 'post',
					url: '/postMessage',
					description: 'Post a message',
					parameters: [
						authTokenParam
					],
					responses: [
						{
							responseCode: 200,
							result: 'Post message successful',
							responseBody: {
								statusCode: 200,
								data: {
									statusMessage: 'Post message successful',
									messageId: 'internal id of newly posted message'
								}
							}
						}
					]
				}
			]
		},
		{
			title: 'Other',
			apis: [
				{
					httpMethod: 'get',
					url: '/statusCodes',
					description: 'Get status codes',
					parameters: [
						authTokenParam
					],
					responses: [
						{
							responseCode: 200,
							result: 'List of status codes',
							responseBody: {
								statusCode: 200,
								data: [
									{statusCodeKey: 'status code key1', statusCodeDisplay: 'status code display value1'},
									{statusCodeKey: 'status code key2', statusCodeDisplay: 'status code display value2'}
								]
							}
						}
					]
				}
			]
		}
	]
};
showApis(config);
