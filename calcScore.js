/**
 * [计算绩点方法]
 * @author zifengb
 * @createTime 2017-07-27T22:13:36+0800
 * @param      {string}  scoreString
 * @return     {[object]}
 */

function format(str) {
	var reg = /\d+?(春|夏|秋|冬)季/;
		var arr = str.split(reg);
		// 记录成绩的数组
		var record = [];
		for (var i = 0, len = arr.length; i< len; i++) {
				var scoreStr = /\d([^0-9]+)[\r\n]((?:\d{1,2})|[\u4E00-\u9FA5\uF900-\uFA2D]+)[\r\n]([0-9]\.?[0-9]?)[\r\n](\d{1,2})[\r\n]([0-9]\.?[0-9]?)/;
				if (scoreStr.test(arr[i])) {
						record.push({
							'project': RegExp.$1, // 科目
							'score100': RegExp.$2, // 百分制分数
							'point': RegExp.$3,		// 绩点
							'hour': RegExp.$4,		// 学时
							'grade': RegExp.$5		// 学分
						});
				}
		}
		return record;
}


/**
 * @author zifengb
 * @creatime 2017-07-27T22:13:36+0800
 * @param {string} str
 * @returns {object}
 */

function getGrade (str){
	var isValid = str.replace(/\s/, '');
	if (!isValid) {
			alert('请先输入成绩文本~');
			return false;
	}
	var record = format(str);
	// 绩点
	var point = [];
	// 学分
	var grade = [];

	for (var i = 0, len = record.length; i < len; i++) {
			var item = record[i];
			point.push(parseFloat(item['point']));
			grade.push(parseFloat(item['grade']));
	}

	var sumPG = 0, // 总学分绩
			sumGrade = 0; // 总学分
	for (var j = 0, len = point.length; j < len; j++) {
			sumPG += point[j] * grade[j];
			sumGrade += grade[j];
	}


	return {
		record: record,
		averagePoint: sumPG / sumGrade
	};
}