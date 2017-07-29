/**
 * [计算绩点方法]
 * @author zifengb
 * @createTime 2017-07-27T22:13:36+0800
 * @param      {[array object]}  scoreJson
 * @return     {[number]}
 */

/**
 * score = [
 * 	[成绩,学分]
 * 	[78, 3.0],
 * 	[78, 3.0],
 * 	[78, 3.0],
 * 	[78, 3.0]
 * ]
 */

function score(grades) {

	// 成绩
	var score = [];
	// 学分
	var point = [];


	for (var i = 0, len = grades.length; i < len; i++) {
			var item = grades[i];
			item.map((value, index) => {
					if (index === 1) {
							point.push(parseFloat(value));
					} else {
							score.push((parseFloat(value) - 50) / 10);
					}
			});
	}

	var sumScore = 0,
			pointSum = 0;
	for (var j = 0, len = score.length; j < len; j++) {
			sumScore += score[j] * point[j];
			pointSum += point[j];
	}


	return sumScore / pointSum;
}

// 得出成绩
// console.log(
// 	score([
// 		[80, 1.5],
// 		[99, 2],
// 		[93, 1.5],
// 		[75, 2],
// 		[81, 3],
// 		[81, 2],
// 		[85, 2],
// 		[85, 3],
// 		[89, 2.5]
// 	])
// );

function format(str) {
	var reg = /\d+?(春|夏|秋|冬)季/;
		var arr = str.split(reg);
		// 记录成绩的数组
		var record = [];
		for (var i = 0, len = arr.length; i< len; i++) {
				var scoreStr = /\d([^0-9]+)[\r\n]((\d{1,2})|[\u4E00-\u9FA5\uF900-\uFA2D]+)[\r\n]([0-9]\.?[0-9]?)[\r\n](\d{1,2})[\r\n]([0-9]\.?[0-9]?)/;
				if (scoreStr.test(arr[i])) {
						record.push({
							'project': RegExp.$1, // 科目
							'score100': RegExp.$2, // 百分制分数
							'point': RegExp.$4,		// 绩点
							'hour': RegExp.$5,		// 学时
							'grade': RegExp.$6		// 学分
						});
				}
		}
		return record;
}

function getGrade (str){
	var isValid = str.replace(/\s/, '');
	if (!isValid) {
			alert('请先输入成绩文本~');
			return false;
	}
	var record = format(str);
	// 成绩
	var score = [];
	// 学分
	var point = [];

	for (var i = 0, len = record.length; i < len; i++) {
			var item = record[i];
			// score.push((parseFloat(item['score100']) - 50) / 10);
			score.push(parseFloat(item['point']));
			point.push(parseFloat(item['grade']));
	}

	var sumScore = 0,
			pointSum = 0;
	for (var j = 0, len = score.length; j < len; j++) {
			sumScore += score[j] * point[j];
			pointSum += point[j];
	}


	return {
		record: record,
		averagePoint: sumScore / pointSum
	};
}