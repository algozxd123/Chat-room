import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserInfo } from '../types/api';

function MyApp({ Component, pageProps }: AppProps) {
  
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = (userString: string | null) => {
      if (userString === undefined || userString == null) return false;
      let user: UserInfo = JSON.parse(userString);
      let now = new Date();
      let expiration = new Date(user.expiration);
      if(now > expiration) return false;

      return user;
    };

    const url = router.asPath;
    const path = url.split('?')[0];
    const userString = localStorage.getItem('user');
    const user = verifyUser(userString);

    if('/login' === path || '/register' === path){
      setAuthorized(true);
      if(user) router.push('/');
      return;
    }

    if(user) setAuthorized(true);
    else {
      setAuthorized(false);
      router.push('/login');
    }
    
  }, [router]);

  return <>{authorized && <Component {...pageProps} />}</>
}

export default MyApp
