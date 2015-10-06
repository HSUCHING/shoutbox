var Entry=require("../lib/entry");
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


function list(req,res,next){
	Entry.getRange(0,-1,function(err,entries){
		if(err) return next(err);
		res.render('entries',{
			title:'Entries',
			entries:entries
		});
	});
}
function form(req,res){
	res.render('post',{title:'Post'});
}
function submit(req,res,next){
	var data=req.body.entry;
	var entry=new Entry({
		"username":res.locals.user.name,
		"title":data.title,
		"body":data.body
	});
	entry.save(function(err){
		if(err) return next(err);
		res.redirect('/');
	});
}
/* GET home page. */
router.get('/', list);
router.get('/post',form);
router.post('/post',multipartMiddleware,submit);

module.exports = router;