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
	res.render('register', { title: 'Register' });
}
function submit(req,res,next){
	var data=req.body.user;
	User.getByName(data.name,function(err,user){
		if(err) return next(err);
		if(user.id){
			res.error("Username:"+ data.name+" already taken!");
			res.redirect('back');
		}else{
			user=new User({
				name:data.name,
				pass:data.pass
			});
			user.save(function(err){
				if(err) return next(err);
				req.session.uid=user.id;
				//req.session.name=user.name;
				res.redirect('/');
			});
		}
	});
}

router.get('/', form);
router.post('/',multipartMiddleware,submit);

module.exports = router;