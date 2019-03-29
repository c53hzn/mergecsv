#!/usr/bin/env node
var fs = require("fs");
const csv2json = require('csvjson-csv2json');
const json2csv = require('csvjson-json2csv');

if (process.argv[2] && /^\w{1,}\.(csv|CSV)$/.test(process.argv[2])) {
	mergeFileInDir(process.cwd(), process.argv[2])
} else {
	console.log("Please input a valid name for the merged file!")
}


function fileContent(filepath, data_csv, new_file_name) {
	if (data_csv != new_file_name) {
		var data = fs.readFileSync(filepath + "\\" + data_csv,'utf-8');
		//json array [{a: 1, b: 2}, {a: 3, b: 4}]
		var rawData = csv2json(String(data), {
			parseNumbers: true
		});
		console.log("File \"" + data_csv + "\" is processed");
		return rawData;
	} else {
		return [];
	}
}

function mergeFileInDir(dir, new_file_name){
	fs.readdir(dir, function(error,files){
		if (error){
			console.log(error.stack);
			return;
		}
		var output_arr = [];
		for(let i=0 ; i < files.length ;i++ ){
			var filename_arr = files[i].split(".");
			if (filename_arr[filename_arr.length - 1].match(/(CSV|csv)/)) {
				let tempData = fileContent(dir, files[i], new_file_name);
				output_arr = output_arr.concat(tempData);
			}
		}
		var output = json2csv(output_arr);
		fs.writeFileSync(dir + "\\" + new_file_name, output, {
			'flag': 'w'
		});
		console.log("\"" + new_file_name + "\" is saved");
	});
}
