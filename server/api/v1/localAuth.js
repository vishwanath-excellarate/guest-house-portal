module.exports = (endpoint, functionKey, method, path) => {
    return {
      getAuthenticateFunction: () => ({
        async authenticate(request, h) {
          const context = { 
            expected: 'it works',
            awesomeField: request.headers['Authorization'],
            // equallyAwesomeField: request.headers['auth-token'],
            // particularlyAwesomeField: request.headers['auth-token'],
          }
          return h.authenticated({
            credentials: {
              context,
            },
          })
        },
      }),
      name: functionKey,
      scheme: functionKey,
    }
  }