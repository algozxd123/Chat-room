import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserInfo } from '../types/api';

const Home: NextPage = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    // redirect to home if already logged in
    const userString = localStorage.getItem('user');
    if (userString === undefined || userString == null) {
        router.push('/login');
    }else{
      const user: UserInfo = JSON.parse(userString);
      const now = new Date();
      const expiration = new Date(user.expiration);
      if(now > expiration){
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
    
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
