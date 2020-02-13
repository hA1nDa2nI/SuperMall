import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: "http://123.207.32.32:8000/api/hy",
    // baseURL: "http://106.54.54.237:8000/api/hy",
    timeout: 5000
  })
  
  // 2.axios的拦截器
  // axios.interceptors // 全局拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config  // 拦截完要返回
  }, err => {
    console.log(err); // 发送请求失败时
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res.data);
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config);
}
