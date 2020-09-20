const formidable = require('formidable');
const fs = require('fs');
const express = require("express");
const app = express();

app.listen(4200, () => console.log("Listening on Port 4200"));

app.use(express.static('public'));

app.use('/upload', function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.path;
		var newpath = process.cwd() + '/public/users/' + fields.username.toLowerCase() + '/' + files.filetoupload.name;

		if (fs.existsSync(process.cwd() + '/public/users/' + fields.username.toLowerCase())) {
			fs.rename(oldpath, newpath.replace("..", "."), function (err) {
				if (err) throw err;
				res.write("Uploaded");
				res.end();
			});
		} else {
			res.write("No Account");
			res.end();
		}
	});
});
