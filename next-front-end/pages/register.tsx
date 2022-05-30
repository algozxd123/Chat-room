import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from "next/link";
import Alert from "../components/alert";
import { register } from '../lib/api';
import { isData } from '../types/api';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({
    type: 'danger',
    message: 'Please try again later.',
    display: false
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if(password !== confirm_password){
      setAlert({
        type: 'danger',
        message: 'Password confirmation failed.',
        display: true
      });
      return;
    }

    register(username, email, password).then(res => {
      if(!isData(res)){
        setAlert({
          type: 'danger',
          message: res.error,
          display: true
        });
        return;
      }

      setAlert({
        type: 'success',
        message: 'Please confirm your email address.',
        display: true
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    }).catch(error => {
      setAlert({
        type: 'danger',
        message: 'Unexpected error, please try again later.',
        display: true
      });
      return;
    });
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <Alert type={alert.type} message={alert.message} display={alert.display}/>
      <div className='p-5 border-solid border-4 rounded-xl border-[#725AC1]'>
        <form className='flex flex-col' action="/register" method="post">
          <h1 className='text-center text-2xl'>Register</h1>
          <div className='h-1 bg-[#725AC1] my-3 self-center w-1/2'></div>
          <label className="mt-3" htmlFor="first">Username:</label>
          <input value={username} onChange={e => {setUsername(e.currentTarget.value)}} className="mt-1 rounded-md bg-[#F7ECE1]  h-8 border-[#7e62a8] border-solid border-2 outline-none t px-2 py-1" type="text" id="username" name="username" />

          <label className="mt-3" htmlFor="password">Email:</label>
          <input value={email} onChange={e => {setEmail(e.currentTarget.value)}} className="mt-1 rounded-md bg-[#F7ECE1]  h-8 border-[#7e62a8] border-solid border-2 outline-none t px-2 py-1" type="email" id="email" name="email" />

          <label className="mt-3" htmlFor="password">Password:</label>
          <input value={password} onChange={e => {setPassword(e.currentTarget.value)}} className="mt-1 rounded-md bg-[#F7ECE1]  h-8 border-[#7e62a8] border-solid border-2 outline-none t px-2 py-1" type="password" id="password" name="password" />

          <label className="mt-3" htmlFor="confirm_password">Confirm password:</label>
          <input value={confirm_password} onChange={e => {setConfirmPassword(e.currentTarget.value)}} className="mt-1 rounded-md bg-[#F7ECE1]  h-8 border-[#7e62a8] border-solid border-2 outline-none t px-2 py-1" type="password" id="confirm_password" name="confirm_password" />

          <span className='mt-2'>Already have an account? <Link href="/login"><a>Login.</a></Link></span>

          <button className='mt-7 bg-[#725AC1] hover:bg-[#8D86C9] text-white py-3' onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
