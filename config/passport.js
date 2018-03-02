var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require('./keys');
var saync = require('aync');
var request = require('request');

var User =  require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy(secret.facebook, (req, token, refreshToken, profile, done)=>{
    User.findOne({facebook : profile.id},(err, user) => {
        if(err) return done(err);

        if(user){
            req.flash('Login Message','Successfully Login With Facebook');
            return done(null, user);
        }else{
            async.waterfall([
                function(callback){
                    var newUser = new User();
                    newUser.email = profile._json.email;
                    newUser.facebook = profile.id;
                    newUser.tokens.push({kind:'facebook', token:token});
                    newUser.profile.name = profile.displayName;
                    newUser.profile.picture= 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    
                    newUser.save(err => {
                        if (err) throw err;
                        req.flash('Login Message','Successfully Login With Facebook');
        
                       callback(err, newUser);
                    })
                },
                function(newUser,callback){
                    //MailChimp Request
                    request({
                        url : 'https://us17.api.mailchimp.com/3.0/lists/9f947b39d0/members',
                        method : 'POST',
                        headers : {
                            'Authorization': 'randomUser e9b2c129c9ee62f48ca4b362c78d5075-us17',
                            'Content-Type':'application/json'
                        },
                        json : {
                            'email_address' : newUser.email,
                            'status' : 'subscribed'
                        }
                    }, function(err,response,body){
                        if(err){
                            return done(err,newUser);
                        }else{
                            console.log("Success");
                            return done(null,newUser);
                        }
                    })
                }
               
            ])
        }
    })

  }))