module.exports = (endpoint, functionKey, method, path) => {
    return {
      getAuthenticateFunction: () => ({
        async authenticate(request, h) {
          const context = { 
            expected: 'it works',
            awesomeField: request.headers['x-field1'],
            equallyAwesomeField: request.headers['x-field2'],
            particularlyAwesomeField: request.headers['x-field3'],
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