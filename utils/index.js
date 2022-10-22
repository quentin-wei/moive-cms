import fs from 'fs'

// 1. 判断文件是否存在的函数
function isExit(fileName) {
	console.log(fileName)
	return new Promise((resolve, reject) => {
		fs.stat(fileName, err => {
			if (err) {
				reject('文件不存在！')
			} else {
				resolve('文件存在！')
			}
		})
	})
}

// 2. 删除文件函数
function delFile(fileName) {
	return new Promise((resolve, reject) => {
		fs.unlink(fileName, err => {
			if (err) {
				reject('文件删除失败！')
			} else {
				resolve('文件删除成功！')
			}
		})
	})
}

export { isExit, delFile }
