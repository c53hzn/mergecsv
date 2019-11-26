# merge your csv files in command line, written in NodeJS script

# NodeJS脚本写的合并csv文件的命令行工具

## Menu

1. [Usage](#usage)

2. [Points to notice](#points-to-notice)

## 中文说明

1. [使用说明](#使用说明)

2. [注意事项](#注意事项)

3. [其他事项](#其他事项)

## Usage

First clone the repository to node_modules folder in your local computer

	git clone https://github.com/c53hzn/mergecsv
	
Then install the 2 dependensies

	npm install

make it a command line function

	npm link

Go to the folder of your csv files, execute the following command

	mergecsv new_file_name.csv

Then your merged csv is ready.

## Points to notice

1. Only csv files are going to be processed

2. Each csv file should have the exactly same headers

3. If your csv files don't have headers, simply use `copy *.csv new_file_name.csv` in your command line

## 使用说明

此脚本可以将文件夹内所有csv文件合并成一个新的csv。

先把repo克隆到你的本地node_modules文件夹里

	git clone https://github.com/c53hzn/mergecsv

然后安装2个依赖

	npm install

然后将这个node脚本变成你的电脑上的命令行工具

	npm link

接着去你要合并csv文件的文件夹，执行以下命令

	mergecsv new_file_name.csv

然后你的合并文件就有了。

## 注意事项

1. 该脚本只处理csv文件

2. 所有csv文件的表头必须一致

3. 如果csv文件没有表头，直接在cmd用 `copy *.csv new_file_name.csv` 命令即可

## 其他事项

1. 有时候原csv文件末尾没有换行，如果用了`copy`命令的话，下一份csv的第一行会和上一份csv的最后一行粘连，此时有一个bat脚本可以解决    
	`for %f in (*.csv) do type %f>>new_file_name.csv`    
解决方案来自[这里](https://stackoverflow.com/questions/45652493/merging-text-files-in-bat-with-line-break-between-files)

2. 如果csv文件有表头，其实也有bat脚本可以解决，但只适用于全英文数据    

	```
	@echo off
	setlocal
	set first=1
	>new.csv.tmp (
	  for %%F in (*.csv) do (
	    if defined first (
	      type "%%F"
	      set "first="
	    ) else more +1 "%%F"
	  )
	)
	ren new.csv.tmp new.csv
	```

	解决方案来自[这里](https://stackoverflow.com/questions/12745623/batch-combine-csv-remove-header/12751399#12751399)    
	这个可以只保留第一个csv文件的表头，但是有个问题是从第二个文件开始的中文会变乱码，所以也不适用。    
	copy命令不会让中文变乱码，但是不能处理csv之间末行和首行粘连的问题，也不能去除多余表头。    
	为了能去掉多余的表头，让末行首行不粘连，又可以不出现中文乱码，干干净净整整齐齐地合并数据，我绞尽脑汁写了这个Node脚本。

3. 既然都写到这里了，再说说最初从浏览器导出csv的时候，可以在`encodeURIComponent()`的时候人为添加末尾换行，以避免之后的粘连，像这样`encodeURIComponent(str + "\n")`    
还有data开头的部分，有的人说要这样写：`data:text/csv;charset=utf-8,\ufeff`，说是`\ufeff`可以避免出现中文乱码。但是呢，加了之后不管是Excel还是OpenOffice都跟我说文件开头有空字符，合并出来的csv每到下一份文件开头都会显示不正常，在cmd里面用type命令读取文字的时候看到第一个字符是个框框。后来又试了一次导出csv文件的时候不要它，就完全正常了。我一脸黑人问号？前辈们这是在坑我呢嘛。    
总之，导出csv的时候在a标签上加的href一定要是这样：`data:text/csv;charset=utf-8,encodeURIComponent(str + "\n")`，导出来的数据基本上就可以直接用了。

以上就是我这两天学到的bat操作、浏览器导出操作、Node脚本操作的全部内容了。
