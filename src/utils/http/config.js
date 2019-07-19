export default {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  method: 'post',
  // 基础url前缀
  // baseURL: 'https://vclass.wangsu.com/api',
  // baseURLClassroom: 'https://vclassroom.wangsu.com/api',
  // baseURL: 'http://vclassroom.wangsu.com',
  // baseURL: 'http://10.8.110.46:9717',
  baseURLDebug: '/api',
  baseURL: 'https://ty.xmsoft.com/',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
  xApiVersion: '1.0'
};
