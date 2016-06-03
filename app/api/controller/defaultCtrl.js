module.exports = function* () {
	function getData(){
		return function (callback){
			setTimeout(function(){
				callback(0,{});
			},3000)
		}
	}
	yield getData();
	this.body = 'default';

	// this.res.end();
}
exports.__controller__ = false;