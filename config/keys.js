module.exports = {
    port : 5000,
    secret : 'jile',
    facebook : {
        clientID : '1607490699287482',
        clientSecret : 'e1134ef9a89ef5ade2a389298fe93542',
        profileFields : ['emails','displayName'],
        callbackURL : 'http://localhost:5000/auth/facebook/callback'
        
    }
}