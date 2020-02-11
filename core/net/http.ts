import { message } from 'antd';
import { any } from 'prop-types';

const codeMessage: MessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const checkStatus = (response: any): Promise<Response> => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  message.error(`请求错误：${errortext}`);
  return new Promise(() => {});
};

const request = (url: string, config: any): Promise<Response> => {
  const fullUrl = '' + url;
  const headers = {headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }};

  const request = {...config, ...headers};
  return fetch(fullUrl, request)
    .then(checkStatus)
    .then((response: any): any => {
      const res = response.json().then((re: RequestType): any => {
        if (re.status === 0) {
          return re.data;
        } else if (re.status === 1) {
          message.error(re.error);
          return new Promise(() => {});
        } else {
          message.error('接口访问错误，请稍后再试');
          throw re;
        }
      });
      return res;
    })
    .catch((e: any): void => {
      console.log(e);
      throw e;
    });
};
interface MessageType {
  [index: number]: string;
}

const http = {
  get: (url: string, params?: any): Promise<any> => {
    let requestUrl = url;
    if (params) {
      const paramsArray: string[] = [];
      // 拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        requestUrl += '?' + paramsArray.join('&');
      } else {
        requestUrl += '&' + paramsArray.join('&');
      }
    }
    return request(requestUrl, {
      method: 'GET',
    });
  },
  post: (url: string, params: any): Promise<any> => {
    return request(url, {
      body: JSON.stringify(params),
      method: 'POST',
    });
  },
  put: (url: string, params: any): Promise<any> => {
    return request(url, {
      body: JSON.stringify(params),
      method: 'PUT',
    });
  },
  delete: (url: string, params?: any): Promise<any> => {
    let requestUrl = url;
    if (params) {
      const paramsArray: string[] = [];
      // 拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        requestUrl += '?' + paramsArray.join('&');
      } else {
        requestUrl += '&' + paramsArray.join('&');
      }
    }
    return request(requestUrl, {
      method: 'DELETE',
    });
  },
  upload(url: string, params: any): Promise<any> {
    return request(url, {
      method : 'UPLOAD',
      body: params,
    });
  },
};
export default http;
export interface RequestType {
  status: number;
  data?: any;
  error?: any;
}

export function returnSuccess(data: any): RequestType {
  return {
    status: 0,
    data,
  };
}

export function returnError(status = 1, error: any): RequestType {
  return {
    status,
    error,
  };
}
