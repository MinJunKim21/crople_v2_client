export const LoginStart = (userCredentials) => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (userObject) => ({
  type: 'LOGIN_SUCCESS',
  payload: userObject,
});

export const LoginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
