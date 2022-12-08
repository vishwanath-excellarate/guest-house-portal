const getResponseHeaders = (token) => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Auth-Token' : token ?? ""
    };
  };

module.exports = { getResponseHeaders };