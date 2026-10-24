export const demoUser = {
  username: 'standard_user',
  password: 'secret_sauce',
} as const;
export const invalidLogins = [
  {
    id: '002',
    title: 'invalid username',
    username: 'unknown_user',
    password: demoUser.password,
    error: 'Username and password do not match any user in this service',
  },
  {
    id: '003',
    title: 'invalid password',
    username: demoUser.username,
    password: 'incorrect',
    error: 'Username and password do not match any user in this service',
  },
  {
    id: '004',
    title: 'empty credentials',
    username: '',
    password: '',
    error: 'Username is required',
  },
  {
    id: '005',
    title: 'missing username',
    username: '',
    password: demoUser.password,
    error: 'Username is required',
  },
  {
    id: '006',
    title: 'missing password',
    username: demoUser.username,
    password: '',
    error: 'Password is required',
  },
] as const;
