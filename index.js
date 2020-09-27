const formidable = require('formidable');
const fs = require('fs');
const express = require("express");
const app = express();

app.listen(8080, () => console.log("Listening on Port 8080"));

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
			res.write("This Directory does not exist, you can request creation at Susul#1312");
			res.end();
		}
	});

app.get('/list', function (req, res) {
	fs.readdir(directoryName, function(e, files) {
		if (e) {
			console.log('Error: ', e);
			return;
		}
		files.forEach(function(file) {
			var fullPath = path.join(directoryName,file);
			fs.stat(fullPath, function(e, f) {
				if (e) {
					console.log('Error: ', e);
					return;
				}
				if (f.isDirectory()) {
					walk(fullPath);
				} else {
					console.log('- ' + fullPath);
				}
			});
		});
	});
});
