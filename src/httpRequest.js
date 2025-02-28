import axios from 'axios';

export const sendHttpRequest = async (requestConfig, headers, params, body) => {
  const url = new URL(requestConfig.url);

  const queryParams = {};
  params.forEach(param => {
    if (param.checked && param.key) {
      queryParams[param.key] = param.value;
    }
  });

  const requestHeaders = {};
  headers.forEach(header => {
    if (header.checked && header.key) {
      requestHeaders[header.key] = header.value;
    }
  });

  try {
    const response = await axios({
      method: requestConfig.method,
      url: url.toString(),
      headers: requestHeaders,
      params: queryParams,
      data: requestConfig.method !== 'GET' ? body : null
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    };
  } catch (error) {
    console.log(error)
    if (error.response) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        status: error.code,
        data: error.message,
      };
    } else {
      return {
        status: "Unknown",
        data: error,
      };
    }
  }
};