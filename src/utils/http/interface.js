import $axios from './api'; // 倒入 api
export const GetCouponList = params => {
  return $axios({
    url: 'Coupon/GetCouponList',
    headers: {
      token: params.token
    },
    method: 'get',
    params
  });
};
export const ReceivingPreferentialOffers = params => {
  return $axios({
    url: 'Coupon/ReceivingPreferentialOffers',
    headers: {
      token: params.token
    },
    method: 'get',
    params
  })
};
export const SendSMS = params => {
  return $axios({
    url: 'SMS/SendSMS',
    method: 'get',
    params
  })
};
export const GetToken = params => {
  return $axios({
    url: 'Login/Login',
    method: 'get',
    params
  })
};
// 默认全部倒出
// 根据需要进行
export default {
  GetCouponList,
  ReceivingPreferentialOffers,
  SendSMS,
  GetToken
};
