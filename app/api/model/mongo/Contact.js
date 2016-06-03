'use strict';

// model名称，即表名
exports.model = 'Contact';

// 表结构
exports.schema = [{
  id: {type: String,unique: true,required: false},
  firstName: {type: String,required: false},
  lastName: {type: String,required: false},
  phoneNumber: {type: String,required: false}
}, {
  autoIndex: true,
  versionKey: false
}];

// 静态方法:http://mongoosejs.com/docs/guide.html#statics
exports.statics = {}

// http://mongoosejs.com/docs/guide.html#methods
exports.methods = {
  add: function*() {
    return this.save();
  },
  delContact : function* (id) {
    let ret = false;
    let contact = yield this.model('Contact').findOne({id:id});

    if(contact){
      yield this.model('Contact').remove({id:id});
      ret = true;
    }
    return ret;
  },
  edit: function*(is_new) {
    let id = this.id;

    function getData(data) {
      let result = {};
      for (let item in data) {
        if (data.hasOwnProperty(item) && item !== '_id') {
          result[item] = data[item];
        }
      }
      return result;
    }
      if(is_new){
          return this.save();
      }
      else{
          return this.model('Contact').update({id: id}, getData(this._doc));
      }
  },
  getContactById: function*(id) {
    return this.model('Contact').findOne({
      id: id
    });
  },
  list: function*() {
    return this.model('Contact').find();
  }
}