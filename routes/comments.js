var express = require('express');
var router = express.Router();


var _comments = [];
var _ci = 1000;

//NEW Comment
router.post('/', function (req, res, next) {
	var comment = req.body.comment;
	var post_id = req.body.post_id;

	if( !comment || comment == '' ) {
		return res.json({error: "Blank comment"})
	}

	var comment = {id: _ci++, post_id: post_id || 0, comment: comment, user_id: 11, status: 1,
         "user_info": {
            "id": 11,
            "user_url": "/frontpage/#user/48",
            "user_photo": "https://fppp1.s3.amazonaws.com/2009a410-05f4-11e5-bc8d-45ff6d50e621.jpg",
            "user_name": "Edgar Marukyan",
            "user_peach": "",
            "user_banner_path": "https://fppp1.s3.amazonaws.com/dc374670-05f3-11e5-bc8d-45ff6d50e621.jpg",
            "posting_enabled": false,
            "contacts": {},
            "lastUsedInterest": 0,
            "interests": []
         },
         "value_date": 1433008637.057
     };

    _comments.post_id = _comments.post_id || [];
	_comments.post_id.push(comment);
	console.log(_comments);
	setTimeout(function(){
		res.json({status: 'ok'})
		},
		1500
	);
})


//GET post comments
router.get('/', function(req, res, next) {
	var post_id = req.query.post_id;

	if( !post_id ) {
		return res.json({error:'post_id is missing'});
	}

	_comments.post_id = _comments.post_id || [];
	res.json({'status': 'ok', comments: _comments.post_id, total_comments: _comments.post_id.length});
});




//DELETE comment
router.delete('/:commentid', function(req, res, next){
	var comment_id = req.params.commentid;
	var post_id = req.query.post_id || 0;

	if( !comment_id || !post_id ) {
		return res.json({error: 'Please prvide post_id and comment_id'});
	}

	comment_id = parseInt(comment_id);

	_comments.post_id = _comments.post_id || [];
	_comments.post_id.map(function(cmt, i){
		if( cmt.id == comment_id) {
			_comments.post_id.splice(i, 1);
		}
	});

	setTimeout(function(){
		res.json({status: 'ok'});
		},
		1500
	);
});




module.exports = router;