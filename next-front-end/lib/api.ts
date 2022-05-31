import { ApiResponse, isArrayMessage, isData, isMessage, isUserInfo, UserInfo } from "../types/api";

export async function register(name: string, email: string, password: string){

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

export async function getMessages(userId: string){

  const res = await fetch(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/message/`,{
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${userId}`
    },
    method: 'GET'
  });

  const json : ApiResponse = await res.json();

  if(!isData(json)){
    console.error(json.error);
    return json;
  }

  if(!isArrayMessage(json)){
    throw new Error('Failed to fetch API');
  }

  return json;
}

export async function sendMessage(userId: string, text: string){

  const res = await fetch(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/message/create`,{
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${userId}`
    },
    method: 'POST',
    body: JSON.stringify({
      text,
    })
  });

  const json : ApiResponse = await res.json();

  if(!isData(json)){
    console.error(json.error);
    return json;
  }

  if(!isMessage(json)){
    throw new Error('Failed to fetch API');
  }

  return json;
};