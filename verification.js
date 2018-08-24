/**
 * form表单验证
 * @author 搬砖的小白
 * @version 1.0.1
 * @date 2018/07/16
 * @type {{css: string, default_function: {required: string, minlength: string, maxlength: string, rule: string, max: string, min: string}, error: verification.error, required: verification.required, stringLength: verification.stringLength, rules: verification.rules, inputNumber: verification.inputNumber, submit: verification.submit, reset: verification.reset, init: verification.init}}
 */
var verification = {
    css: "//" + location.hostname + "/static/js/verification/defaults/",
    /**
     * 默认验证函数
     */
    default_function: {
        required: "required",
        minlength: "stringLength",
        maxlength: "stringLength",
        rule: "rules",
        max: "inputNumber",
        min: "inputNumber",
        mobile: "isMobile",
        email: "isEmail",
        idcard: "isIdCard",
        equest: "eq"
    },
    error: function (text, obj) {
        $(obj).addClass("ver-error-input");
        $(obj).after("<span class='ver-errors'><i class='iconfont ver-icon-carets ver-error-caret'></i><i class='iconfont icon-info-o'></i> " + text + "</span>");
    },
    /**
     * 必填验证
     * @param obj
     */
    required: function (obj) {
        var value = $(obj).val();
        $(obj).siblings(".ver-errors").remove();
        var text = $(obj).data("required");
        if (value == '') {
            this.error(text, obj);
        }
    },
    eq: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var eq2Id = $(obj).data("equest"),
            value = obj.value,
            valueEq = $("#" + eq2Id).val(),
            text = $(obj).data("eq-message");
        if (value != valueEq) {
            this.error(text, obj);
        }
    },
    /**
     * 字符长度验证
     * @param obj
     */
    stringLength: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var min = $(obj).data("minlength");
        var max = $(obj).data("maxlength");
        var length = $(obj).val().length;
        var text = "";
        if (min && max) {
            if (length < min) text = "最少输入" + min + "个字";
            else if (length > max) text = "最多输入" + max + "个字";
        } else if (min && length < min) {
            text = "最少输入" + min + "个字";
        } else if (max && length > max) {
            text = "最多输入" + max + "个字";
        }

        if (text) {
            this.error(text, obj);
        }
    },
    /**
     * 正则验证
     * @param obj
     * @returns {boolean}
     */
    rules: function (obj) {
        var rule = $(obj).data("rule");
        rule = new RegExp(rule);
        $(obj).siblings(".ver-errors").remove();
        var message = $(obj).data("rule-message");
        if (!message) message = "不符合规则";
        if (!rule.test($(obj).val())) {
            this.error(message, obj);
            return false;
        }
        return true;
    },
    /**
     * 数字验证
     * @param obj
     */
    inputNumber: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var number = $(obj).val();
        number = parseFloat(number);
        var min = parseFloat($(obj).data("min"));
        var max = parseFloat($(obj).data("max"));
        var text = "";
        if (isNaN(number)) text = "请输入一个规则的数字！";
        else if (min && max) {
            if (number < min) text = "输入的值不能小于" + min;
            else if (number > max) text = "输入的值不能大于" + max;
        } else if (min && number < min) {
            text = "输入的值不能小于" + min;
        } else if (max && number > max) {
            text = "输入的值不能大于" + max;
        }
        if (text) {
            this.error(text, obj);
        }
    },
    /**
     * 手机号/电话号码验证
     * @param obj
     */
    isMobile: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var tel = /^(0\d{2,3}\d{7,8}|0\d{2,3}-)\d{7,8}$/;
        var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var values = $(obj).val();
        var mob = $(obj).data("mobile");
        if (!tel.test(values) && !mobile.test(values) && (mob === true || values != '')) {
            this.error("手机号码或电话号码匹配失败！", obj);
        }
    },
    /**
     * 邮箱验证
     * @param obj
     */
    isEmail: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        var values = $(obj).val();
        var req = $(obj).data("email");
        if (!email.test(values) && (req === true || values != '')) {
            this.error("不规则的email邮箱", obj);
        }
    },
    /**
     * 身份证验证
     * @param obj
     */
    isIdCard: function (obj) {
        $(obj).siblings(".ver-errors").remove();
        var idCard = /^([1-9]\d{5}[1]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9xX]|[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3})$/;
        var card = $(obj).val();
        var req = $(obj).data("idcard");
        if (!idCard.test(card) && (req === true || card != '')) {
            this.error("身份证号码错误！", obj);
        }
    },
    /**
     * 表单提交
     * @param obj
     * @returns {boolean}
     */
    submit: function (obj) {
        var flag = true;
        var $this = $(obj);
        var that = this;
        var ajax_flag = $(obj).data("form");
        //判断是否符合验证规则
        $.each(this.default_function, function (i, v) {
            $this.find("[data-" + i + "]").each(function () {
                that[v](this);
            });
        });
        //判断是否存在错误信息
        if ($this.find(".ver-error-input").length > 0) {
            $this.find(".ver-error-input:first").focus();
            flag = false;
        }
        if (flag) {
            if (!ajax_flag || ajax_flag != 'ajax') {
                $this.submit();
                return true;
            }
            $.ajax({
                type: $this.attr("method"),
                url: $this.attr("action"),
                data: $this.serialize(),
                dataType: "json",
                success: function (msg) {
                    if (msg.code == 1) {
                        layer.msg(msg.msg, function () {
                            if ($this.data("parent")) parent.location.href = msg.url;
                            location.href = msg.url;
                        });
                    } else {
                        layer.msg(msg.msg);
                    }
                },
                error: function (d) {
                    layer.msg("读取错误")
                }
            });
            return false;
        }
        return false;
    },
    /**
     * 清除表单
     * @param obj
     */
    reset: function (obj) {
        $(obj).append('<input type="reset" hidden>');
        $(obj).find("input[type=reset]").click();
        $(obj).find("input[type=reset]").remove();
        $(obj).find(".ver-errors").remove();
        $(obj).find(".ver-error-input").removeClass("ver-error-input");
    },
    /**
     * 初始化验证表单
     */
    init: function () {
        //加载样式表
        var css = document.createElement("link"),
            icon = document.createElement("link");
        css.href = this.css + "common.css";
        icon.href = this.css + "iconfont.css";
        css.rel = icon.rel = "stylesheet";
        css.type = icon.type = "text/css";
        var link = document.getElementsByTagName("link")[0];
        link.parentNode.insertBefore(css, link);
        link.parentNode.insertBefore(icon, link);
        var that = this;
        $("form *").each(function () {
            var reg = "";
            var def = $(this);
            $.each(that.default_function, function (i, v) {
                if (def.data(i) || def.data(i) === false) {
                    reg = v;
                    return true;
                }
            });
            if (reg) {
                $(this).bind("change blur", function () {
                    that[reg](this);
                }).focus(function () {
                    $(this).removeClass("ver-error-input").siblings(".ver-errors").remove();
                });
            }
        })
    }
};
window.Verification = verification;
Verification.init();