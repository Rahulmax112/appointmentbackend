export const setAuthCookies = (cookie: any, session: any, user: any) => {
  // Token cookie (accessible or httpOnly based on your choice)
  cookie.token.set({
    value: session.access_token,
    httpOnly: false, // change to true if needed
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  // User cookie (only safe fields)
  
  cookie.user.set({
    value: JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.fullName || '',
      role: user.user_metadata?.role || 'user',
    }),
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

};
