
var Fhcp = new function() {

	var logval ="";
	function uuid(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
				.split('');
		var uuid = [], i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++)
				uuid[i] = chars[0 | Math.random() * radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data. At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	}
	return {
          
		//备课中的uuid
		uuid:function(){
			return uuid(8, 16);
		},
		addLog:function(val){
			logval = logval+val+'<br>';
		},
		getLog:function(){
			return logval;
		}

	};
}();

function New(aClass, aParams) {
	function new_() {
		aClass.Create.apply(this, aParams);
	};
	new_.prototype = aClass;
	return new new_();
};