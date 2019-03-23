## usage

npm install mergecsv

create a js file like this in the folder of those csv files

	const mergecsv = require('mergecsv');

	mergecsv(__dirname, "new_file_name.csv");

Or simply copy the demo.js file to your folder

	node demo.js

Then your merged csv is ready.

## Notice

1. Only csv files are going to be processed

2. Each csv file should have the exactly same headers

3. If your csv files don't have headers, simply use `copy *.csv new_file_name.csv` in your command line
