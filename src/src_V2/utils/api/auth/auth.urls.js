export const AUTH_ENDPOINTS = {
  logIn: '/sign-in',
  signUp: '/sign-up',
  signOut: '/logout',
  deactivate: (id) => `/user/${id}`,
  reactivate: (id) => `/user/activate/${id}`,
};
