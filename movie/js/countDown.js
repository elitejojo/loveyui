/*	
	必填参数:
			timeSpan     剩余结束时间
			callSetTime  倒计时变化回调函数
			callClose    倒时计结束回调函数
	选填参数:
			timeInterval 倒计时间隔[毫秒],默认为1000毫秒
	例如:	
			{ timeSpan: 100, callSetTime: setTuan, callClose: closeTuan, timeInterval: 1000 }
*/
var CountDown = function(obj) {
	this.obj = obj;
}
//开始函数
CountDown.prototype.Start = function(timeSpan) {
	//如果参数合法,则开启倒计时
	if (this.obj && this.obj.timeSpan && this.obj.timeSpan > 0) {
	    var _countDown = this;
		if (timeSpan != undefined) {
			_countDown.obj.timeSpan = timeSpan;
		}
		_countDown.obj.timeSpan = _countDown.obj.timeSpan * 1000;
		if (!this.obj.timeInterval || this.obj.timeInterval == 0) {
			this.obj.timeInterval = 1000;
		}
		if (!this.times || this.times == 0) {
			this.times = setInterval(function() { _countDown.TimeInterval(_countDown); }, this.obj.timeInterval);
		}
	}
}

//计算函数
CountDown.prototype.TimeInterval = function(_countDown) {
	if (_countDown.obj.timeSpan > _countDown.obj.timeInterval) {
		_countDown.obj.timeSpan -= _countDown.obj.timeInterval;
		var hour = parseInt(_countDown.obj.timeSpan / 1000 / 3600);
		var minute = parseInt(_countDown.obj.timeSpan / 1000 / 60) % 60;
		var second = parseInt(_countDown.obj.timeSpan / 1000) % 60;
		//毫秒
		var milliSecond = parseInt(_countDown.obj.timeSpan % 1000/100);
		if (hour < 10) {hour = "0" + hour;}
		if (minute < 10) {minute = "0" + minute;}
		if (second < 10) {second = "0" + second;}
		if (_countDown.obj.callSetTime) {
			_countDown.obj.callSetTime({ hour: hour, minute: minute, second: second, milliSecond: milliSecond });
		}
	} else {
		if (_countDown.times && _countDown.times != 0) {clearInterval(_countDown.times);}
		if (_countDown.obj.callClose) {_countDown.obj.callClose();}
	}
}