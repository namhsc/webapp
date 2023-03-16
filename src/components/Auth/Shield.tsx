import { useRouter } from 'next/router';
import { ScriptProps } from 'next/script';
import { NextShield, NextShieldProps } from 'next-shield';

export function Shield({ children }: ScriptProps) {
  const router = useRouter();

  const shieldConfig: NextShieldProps<
    // privateRoutes
    ['/chat'],
    // publicRoutes
    ['/account/login', '/account/register', '/account/forgot']
  > = {
    router,
    isAuth: false,
    isLoading: false,
    LoadingComponent: <p>Loading...</p>,
    privateRoutes: ['/chat'], //Array of private routes. These are only accessible when the user is authenticated.
    publicRoutes: ['/account/login', '/account/register', '/account/forgot'], //Array of public routes. These are only accessible when the user is NOT authenticated.
    hybridRoutes: [
      '/',
      '/account/login',
      '/account/register',
      '/account/forgot',
      '/blog',
      '/components',
    ], //Array of hybrid routes. These are always accessible; doesn't matter the auth state.
    loginRoute: '/account/login', //Login page, must be a public route.
    RBAC: {
      ADMIN: {
        grantedRoutes: ['/chat'], //Route where your user is going to access after login, must be a private route.
        accessRoute: '/chat',
      },
      EMPLOYEE: {
        grantedRoutes: ['/chat'],
        accessRoute: '/chat',
      },
    },
    userRole: 'ADMIN',
  };

  return <NextShield {...shieldConfig}>{children}</NextShield>;
}
