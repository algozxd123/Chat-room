import { ApiResponse, isData, isUserInfo } from "../types/api";

export async function register(name: string, email: string, password: string){
  console.log(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/register`);

  const res = await fetch(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/register`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password
    })
  });


  const json : ApiResponse = await res.json();

  if(!isData(json)){
    console.error(json.error);
    return json;
  }

  if(!isUserInfo(json)){
    throw new Error('Failed to fetch API');
  }

  return json;
}

export async function login(email: string, password: string){
  console.log(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/register`);

  const res = await fetch(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/login`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });


  const json : ApiResponse = await res.json();

  if(!isData(json)){
    console.error(json.error);
    return json;
  }

  if(!isUserInfo(json)){
    throw new Error('Failed to fetch API');
  }

  return json;
}