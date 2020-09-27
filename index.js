const formidable = require('formidable');
const fs = require('fs');
const express = require("express");
const app = express();
const path = require('path');

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
});

app.get('/list', async function (req, res) {
	var files = [];
	walkSync('public/users', files);
	var paths = files.map(function removeFirst(path) {
	  return path.slice(path.indexOf('/'));
	})

	res.write(JSON.stringify(paths));
	res.end();
});

const walkSync = function(dir, filelist) {
			 var path = path || require('path');
			 var fs = fs || require('fs'),
					 files = fs.readdirSync(dir);
			 filelist = filelist || [];
			 files.forEach(function(file) {
					 if (fs.statSync(path.join(dir, file)).isDirectory()) {
							 filelist = walkSync(path.join(dir, file), filelist);
					 }
					 else {
							 filelist.push(path.join(dir, file));
					 }
			 });
			 return filelist;
	 };
