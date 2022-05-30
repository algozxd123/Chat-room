export type UserInfo = {
  username: string,
  email: string,
  token: string,
  expiration: string
};

export type Error = {
  error: string
};

export type Data = UserInfo;

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