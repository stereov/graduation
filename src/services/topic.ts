import request from '@/utils/request';
import Qs from "qs";
import cookie from 'react-cookies'

export interface TopicParamsType {
  id: number;
  title: string;
  term: number;
  description: string;
  status: number;
  studentid: number;
  teacherid: number;
}

const getTopicTableParams = (params: any) => {
  return {
    pageSize: params.pageSize,
    pageIndex: params.current,
    userid: cookie.load('userid'),
    ...params
  };
};


export async function fetchTopicData(params: any) {
  // console.log(params);
  const res = await request('/gserver/getAllTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: Qs.stringify(getTopicTableParams(params)),
  });

  return res;
}

export async function addTopic(params: TopicParamsType) {
  return request('/gserver/addTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
};

export async function delTopic(params: Array<number>) {
  return request('/gserver/delTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
};

export async function updateTopic(params: string) {
  return request('/gserver/updateTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {updateInfo: params},
  });
};