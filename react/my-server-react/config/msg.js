const ZhenzismsClient = require('./zhenzisms')

var client = new ZhenzismsClient('sms_developer.zhenzikj.com', '103563', '9a241562-6d4c-471f-bd35-c43d4dd80cbd');

function send(tel,code){
    return client.send(`您的验证码是${code}`,tel)
}

module.exports = {
    send
}