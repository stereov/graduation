import request from '@/utils/request';
import Qs from "qs";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}


export interface QueryUserParams {
  userid: number
}
export async function getCurrent(params: QueryUserParams): Promise<any> {
  // console.log(params);
  // return request('/api/currentUser');
  
  return request('/gserver/getCurrentTeacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...params,  // 注意不要忘了前面三个dot
    },
  });
  
}

const getRandomuserParams = (params:any) => {
  return {
    pageSize: params.pageSize,
    pageIndex: params.current,
    ...params
  };
};
 
 
export async function fetchData(params:any) {
  // console.log(getRandomuserParams(params))
  const res = await request('/gserver/getallusers', {
    method: 'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    },
    data: Qs.stringify(getRandomuserParams(params)),
  });
 
  return res;
}