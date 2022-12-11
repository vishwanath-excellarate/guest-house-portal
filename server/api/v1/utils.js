const getResponseHeaders = (token) => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization' : token ?? ""
    };
  };

module.exports = { getResponseHeaders };