var express = require('express');
var router = express.Router();
var clientReposotory = require("../../../Infra/Data/Repositories/clientReposotory");
router.get("", (req, res) => {
	clientReposotory.GetAll((err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.post("", (req, res) => {
	var obj = req.body;
	clientReposotory.Save(obj, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.put("", (req, res) => {
	var obj = req.body;
	clientReposotory.Update(obj, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.delete("/:id", (req, res) => {
	var _id = req.params.id;
	clientReposotory.Delete(_id, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(200, success);
	});

});

module.exports = router;