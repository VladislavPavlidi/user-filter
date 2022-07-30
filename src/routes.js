const ROUTES = {
  home: () => '/',
  login: () => '/login',
  users: () => '/users',
  user: (id = ':id(\\d+)') => `/users/${id}`,
  profile: () => '/profile',
  counter: () => '/counter'
};

export default ROUTES;
