require 'auth0-lock'

clientId = ENV["AUTH0_CLIENT_ID"]
domain = ENV["AUTH0_DOMAIN"]
lock = new Auth0Lock(clientId, domain)

const logIn = <a onClick={(e) =>
  e.preventDefault()
  lock.show({
    
  })
  }
