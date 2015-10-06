/**
 * Created by i068959 on 15/10/6.
 */
var express = require('express');
var multipart = require('connect-multiparty');
var User = require('../lib/user');
var router = express.Router();

var multipartMiddleware = multipart();

function logout(req, res) {
	req.session.destroy(function (err) {
		if (err) throw err;
		res.redirect('/');
	})
}

router.get('/', logout);

module.exports = router;