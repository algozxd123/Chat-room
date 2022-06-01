export type UserInfo = {
  username: string,
  email: string,
  token: string,
  expiration: string
};

export type MessageType = {
  id: string,
  text: string,
  createdAt: string,
  User: {
    name: string
  }
}

export type Error = {
  error: string
};

export type Data = UserInfo | MessageType | [MessageType];

export type ApiResponse = Data | Error;

export const isData = (data : ApiResponse): data is Data => {
  let res = data as Error;

  if(res.error === undefined){
      return true;
  }else{
    return false;
  }
};

export const isUserInfo = (data: Data): data is UserInfo => {
  let user = data as UserInfo;

  if(user.username === undefined ||
     user.email === undefined ||
     user.token == undefined){
    return false;
  }else{
    return true;
  }
}

export const isMessage = (data: Data): data is MessageType => {
  let message = data as MessageType;

  if(message.text === undefined ||
     message.createdAt === undefined ||
     message.User === undefined ||
     message.User.name === undefined){
    return false;
  }else{
    return true;
  }
}

export const isArrayMessage = (data: Data): data is [MessageType] => {
  let messageArray = data as [MessageType];

  if(messageArray.every(isMessage)){
    return true;
  }else{
    return false;
  }
}