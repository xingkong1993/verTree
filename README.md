 #使用须知：
 1. verification是一款开源的用于表单验证插件，当前版本：V1.0.1;
 2. verification提供免费下载开发版，下载链接请见插件下载板块
 3. 使用verification前请先将Verification.css变量修改为项目目录,插件提供默认样式和icon是通过css变量中的路径加载相关样式文件
    > eg:
    >
    > 项目地址为：/data/www/test
    >
    > 更改相关参数为：
    >
    > Verification.css = "/data/www/test/verification/defaults/";
    >
    > 或者
    >
    > Verification.css = "//"+location.hostname+"/verification/defaults/"
 # 方法介绍
 1. init:初始化验证数据方法
 2. submit：提交验证表单方法
 3. reset：清除表单方法
 4. error：错误消息方法
 # 属性说明
 1. data-form:
    > form表单提交方式，不填写表示默认提交方式，通过按method属性的提交方式，可选项[ajax,null,false];
    >
    > 填写ajax表示通过ajax+method方式提交，属性添加在form标记中
    >
    > eg：
    >
    > `<form action="" method="post" data-form="ajax">`
    >
    > ....
    >
    > `</form>`
 2. data-required:
    > 必填参数验证，在form表单中的任意标记中加入此属性，在提交或者失去焦点、选择后将会验证输入的数据是否为空，为空将会提示用户该字段不能为空
    >
    > eg:
    >
    > `<input type="text" name="name" data-required="请填写当前字段"/>`

 3. data-min(max)length:
    > 字符长度验证，在form表单中的任意标记中加入此属性，在提交或者失去焦点、选择后将会验证输入的数据是否达到既定长度
    > 
    > eg:
    >
    > `<input type="text" name="name" data-minlength="3"/>`
    >
    > `<input type="text" name="name" data-maxlength="13"/>`
 4. data-min(max):
    > 数字区间验证，在form表单中的任意标记中加入此属性，在提交或者失去焦点、选择后将会验证输入的数据是否是在限定区间范围内
    >
    > eg:
    >
    > `<input type="text" name="name" data-min="3"/>`
    >
    > `<input type="text" name="name" data-max="13"/>`
 5. data-rule:
    > 正则验证，在form表单中的任意标记中加入此属性，在提交或者失去焦点、选择后将会验证输入的数据是否是在规则范围内
    >
    > eg:
    > `<input type="text" name="href" data-rule="^[a-z][a-z0-9\?\=\/_]+$" data-rule-message="链接包含字母_?/=，以字母开头"/>`
 6. data-mobile(email/idcard):
    > 手机号码(邮箱/身份证号码)验证，在form表单中的任意标记中加入此属性，在提交或者失去焦点、选择后将会验证输入的手机号码是否正确；
    >
    > 可选参数[true,false]，当参数等于true时则表示该字段必须填写，否则则无需填写
    >
    > eg:
    >
    > `<input type="text" name="name" data-mobile="false">`
    >
    > `<input type="text" name="name" data-email="true">`
    >
    > `<input type="text" name="name" data-idcard="false">` 
 # 插件下载
 [verification下载中心](https://xincheng-blog.cn/download/verification.rar)
 # 版权信息
 > Copyright © 2006-2017 by [搬砖的小白](https://www.yum-blog.cn)  
 > All rights reserved。