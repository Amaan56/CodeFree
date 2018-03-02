var passport = require('passport');
var passportConf = require('../config/passport');

module.exports = (app) => {
    
    app.get('/auth/facebook', passport.authenticate(
        'facebook',
        {
        scope : 'email'
       }
    ));

    app.get('/auth/facebook/callback', passport.authenticate(
        {
            successRedirect : '/profile',
            failureRedirect : '/login'
        }
     ));

     app.get('/login', (req,res) => {
         res.render('accounts/login');
     })
     app.get('/logout',(req, res) => {
         req.logout();
         res.redirect('/')
      });
    
      app.get('/profile',(req,res) => {
        res.render('accounts/profile',{
            message : req.flash('loginMessage')
        });
      });

}