/**
 * Created by i068959 on 15/10/5.
 */
var express = require('express');
var multipart = require('connect-multiparty');
var User= require('../lib/user');
var router = express.Router();


/* GET home page. */
var multipartMiddleware = multipart();
function form(req, res){
	res.render('login', { title: 'Login' });
}
function submit(req,res,next){
	var data=req.body.user;
	User.authenticate(data.name,data.pass,function(err,user){
		if(err) return next(err);
		if(user){
			req.session.uid=user.id;
			//req.session.name=user.name;
			res.redirect('/');
		}else{
			res.error("Sorry,invalid credentials");
			res.redirect('back');
		}
	});
}



router.get('/', form);
router.post('/',multipartMiddleware,submit);


module.exports = router;