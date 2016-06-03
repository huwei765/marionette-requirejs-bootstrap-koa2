'use strict';

exports.contacts_list = function*() {
    yield this.bindDefault();

    let ContactModel = this.mongo('Contact');

    let Contacts = yield ContactModel.list();

    this.body = Contacts;
};
exports.contacts_list.__method__ = 'get';

exports.contact = function*() {
    yield this.bindDefault();


    //组装结果
    let result = "";
    let req_method = this.request.method.toLowerCase();

    if(req_method == "delete"){
        let id = this.params.id;
        let ContactModel = this.mongo('Contact');
        result = yield ContactModel.delContact(id);
    }
    else if(req_method.toLowerCase() == "put"){
        let data = this.request.body;
        let ContactModel = this.mongo('Contact',{
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber
        });
        let doc = yield ContactModel.getContactById(data.id);
        let is_new = 0;
        if(!doc){
            is_new = 1;
        }
        result = yield ContactModel.edit(is_new);
    }
    else if(req_method == "post"){
        let data = this.request.body;
        let ContactModel = this.mongo('Contact',{
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber
        });
        let doc = yield ContactModel.getContactById(data.id);
        let is_new = 0;
        if(!doc){
            is_new = 1;
        }
        result = yield ContactModel.edit(is_new);
    }
    else{
        let id = this.params.id;
        let ContactModel = this.mongo('Contact');
        result = yield ContactModel.getContactById(id);
    }

    this.body = result;
};
exports.contact.__method__ = 'all';
exports.contact.__regular__ = '/:id';