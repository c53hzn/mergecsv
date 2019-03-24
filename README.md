1. [Usage](#usage)

2. [Points to notice](#notice)

3. [中文说明](#中文说明)

## Usage

First clone the repository to node_modules folder in your local computer

	git clone https://github.com/houzhenni/mergecsv
	
Then install the 2 dependensies

	npm install

create a js file like this in the folder of your csv files

	const mergecsv = require('mergecsv');

	mergecsv(__dirname, "new_file_name.csv");

Or simply copy the demo.js file to your folder and execute

	node demo.js

Then your merged csv is ready.

## Notice

1. Only csv files are going to be processed

2. Each csv file should have the exactly same headers

3. If your csv files don't have headers, simply use `copy *.csv new_file_name.csv` in your command line

## 中文说明

此脚本可以将文件夹内所有csv文件合并成一个新的csv。

1. 只处理csv文件

2. 所有csv文件的表头必须一致

3. 如果csv文件没有表头，直接在cmd用 `copy *.csv new_file_name.csv` 命令即可

4. 有时候原csv文件末尾没有换行，如果用了`copy`命令的话，下一份csv的第一行会和上一份csv的最后一行粘连，此时有一个bat脚本可以解决    
	`for %f in (*.csv) do type %f>>new_file_name.csv`    
解决方案来自[这里](https://stackoverflow.com/questions/45652493/merging-text-files-in-bat-with-line-break-between-files)

5. 如果csv文件有表头，其实也有bat脚本可以解决（只适用于全英文数据）    

	@echo off    
	setlocal    
	set first=1    
	>new.csv.tmp (    
	  for %%F in (\*.csv) do (    
	    if defined first (    
	      type "%%F"    
	      set "first="    
	    ) else more +1 "%%F"    
	  )    
	)    
	ren new.csv.tmp new.csv    

解决方案来自[这里](https://stackoverflow.com/questions/12745623/batch-combine-csv-remove-header/12751399#12751399)
这个可以只保留第一个csv文件的表头，但是有个问题是从第二个文件开始的中文会变乱码，所以也不适用。    
copy命令不会让中文变乱码，但是不能处理csv之间末行和首行粘连的问题，也不能去除多余表头。    
**我为了能去掉多余的表头，又可以不出现乱码，于是写了这个Node脚本。**

6. 既然都写到这里了，再说说最初从浏览器导出csv的时候，可以在`encodeURIComponent()`的时候人为添加末尾换行，以避免之后的麻烦 => `encodeURIComponent(str + "\n")`    
还有data开头的部分，有的人说要这样写：`data:text/csv;charset=utf-8,\ufeff`，说是`\ufeff`可以避免出现中文乱码。但是呢，加了之后不管是Excel还是OpenOffice都跟我说文件开头有空字符，合并出来的csv每到下一份文件开头都会显示不正常，在cmd里面用type命令读取文字的时候看到第一个字符是个框框。后来又试了一次导出csv文件的时候不要它，就完全正常了。我一脸黑人问号？前辈们这是在坑我呢嘛

以上~
