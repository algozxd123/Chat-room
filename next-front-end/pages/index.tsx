import type { NextPage } from 'next'
import { useRouter } from 'next/router';

const Home: NextPage = () => {

  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

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
