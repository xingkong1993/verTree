/**
 * 文件树
 * @auth 搬砖的小白
 * @version 1.0
 * @date 2018/06/18
 * @type {{values: Array, id: number, table_tree: tree.table_tree, get_table_style: tree.get_table_style, delete_table_tree: tree.delete_table_tree}}
 */
var tree = {
    values: [],
    id: 0,
    formValue: "",
    /**
     * 表格树
     * @param id 容器id
     * @param option 相关参数
     */
    table_tree: function (id, option) {
        this.values = option.value[option.defaults];
        this.id = parseInt(option.defaults);
        var add = "";
        if ($(id).find("i.option").hasClass("icon-plus") || !id) {
            add = "add";
        }
        if (add == "add") {
            var html = "";
            $.each(this.values, function (items, v) {
                if (option.option) {
                    v.option = option.option;
                    v.option = v.option.replace(/\%id/g, v.id);
                    v.option = v.option.replace(/\%name/g, v.name);
                }
                html += "<tr id='children_" + v[option.pk] + "' class='children_" + v[option.pid] + "'>";
                var child = option.value[v[option.pk]];
                var leng = "";
                var flag = 0;
                if (v[option.level] > 1) {
                    leng += '|';
                    for (var k = 1; k < v[option.level]; k++) {
                        leng += "——";
                    }
                }
                var default_option = option;
                default_option.defaults = v[option.pk];
                default_option = JSON.stringify(default_option);
                if (child) {
                    leng += '<i class="iconfont icon-plus option green" onclick=\'Tree.table_tree("#children_' + v[option.pk] + '",' + default_option + ')\'></i>';
                }
                $("thead tr:last td,thead tr:last th").each(function () {
                    // alert();
                    var name = $(this).attr("field");
                    var style = Tree.get_table_style(this);
                    html += "<td style='" + style + "'>"
                    if (v[name]) {
                        if (name == "status" || $(this).data("status")) {
                            v[name] = v[name] == 1 ? '<span  class="iconfont icon-2x icon-success green"></span>' : '<span class="iconfont icon-error red icon-2x"></span>'
                        } else if ($(this).data("image")) {
                            v[name] = '<img src="' + v[name] + '"/>';
                        }
                        if (flag < 1) {
                            html += leng + " " + v[name];
                            flag++;
                        } else {
                            if ($(this).data("icon")) {
                                html += '<i class="' + v[name] + '"></i>';
                            } else {
                                html += v[name];
                            }
                        }
                    }
                    html += "</td>";
                });
                html += "</tr>"
            });
            if (id) {
                //查询是否已经加载相关内容
                $(id).after(html);
                $(id).find("i.option").removeClass("icon-plus").addClass("icon-minus");
            } else {
                $("tbody").append(html);
            }
        } else {
            this.delete_table_tree(option.defaults, option);
        }
    },
    HTMLEncode: function (html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    HTMLDecode: function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    /**
     * 获取表格追加样式
     * @param obj
     * @returns {*}
     */
    get_table_style: function (obj) {
        var style = $(obj).attr("data-style");
        if (style) {
            return style;
        }
        return "";
    },
    /**
     * 删除表格子节点
     * @param level
     * @param option
     */
    delete_table_tree: function (level, option) {
        var id = parseInt(level);
        if (id < 1) {
            $("tbody").empty();
            this.table_tree("", option);
        } else {
            var values = option.value[id];
            $(".children_" + id).remove();
            $("#children_" + id).find("i.option").removeClass("icon-minus").addClass("icon-plus");
            $.each(values, function (i, v) {
                //递归删除所有子节点
                if ($(".children_" + v[option.pk]).length > 0) {
                    Tree.delete_table_tree(v[option.pk], option);
                }
            })
        }
    },
    form_tree: function (data) {
        this.formValue = "";
        console.log(data);
        this.form_tree_child(data);
        $(data.id).parent().empty().html(this.formValue);
    },
    form_tree_child: function (data) {
        var d = this,
            li = "";
        if (data.level == 1) li = "tree-form-box";
        d.formValue += "<ul>"
        $.each(data.data, function (i, v) {
            var check = "icon-check-box",
                checked = "";
            if (data.defaultValue.length > 0 && $.inArray("" + v[data.pk], data.defaultValue) >= 0) {
                check = "icon-check-box-cicre";
                checked = 'checked';
            }
            d.formValue += '<li class="' + li + '" data-items="' + v[data.pk] + '" data-parent="' + v[data.pid] + '">';
            d.formValue += '<span class="form-tree-inputs" onclick="Tree.check_all_input(this)">\n' +
                '                        <i class="iconfont ' + check + ' tree-checks"></i>\n' +
                '                        <input name="tree[' + data.kid + v[data.kid] + '][]" value="' + v[data.pk] + '" type="checkbox" ' + checked + '/>\n' +
                '                        <span>' + v[data.title] + '</span>\n' +
                '                    </span>';
            if (v[data.child]) {
                data.data = v[data.child];
                data.level = v[data.kid] + 1;
                d.form_tree_child(data);
            }
            d.formValue += '</li>';
        });
        d.formValue += '</ul>';
    },
    /**
     * 属性选择框
     * @param obj
     */
    check_all_input: function (obj) {
        var checkbox = $(obj).find("input[type=checkbox]"),
            icon = $(obj).find(".tree-checks"),
            parent = $(obj).parent(),
            items = parent.data("items"),
            pid = parent.data("parent");

        if (checkbox.is(":checked")) {
            checkbox.prop("checked", false);
            icon.addClass("icon-check-box").removeClass("icon-check-box-cicre");
            //子集和全部取消选中
            $("*[data-parent=" + items + "]").find("input[type=checkbox]").prop("checked", false);
            $("*[data-parent=" + items + "]").find(".tree-checks").addClass("icon-check-box").removeClass("icon-check-box-cicre");
        } else {
            checkbox.prop("checked", true);
            icon.removeClass("icon-check-box").addClass("icon-check-box-cicre");
            //子集和全部选中
            $("*[data-parent=" + items + "]").find("input[type=checkbox]").prop("checked", true);
            $("*[data-parent=" + items + "]").find(".tree-checks").removeClass("icon-check-box").addClass("icon-check-box-cicre");
            //判断父级节点选中
            $("*[data-items=" + pid + "]").find(".form-tree-inputs:first").find("input[type=checkbox]").prop("checked", true);
            $("*[data-items=" + pid + "]").find(".form-tree-inputs:first").find(".tree-checks").removeClass("icon-check-box").addClass("icon-check-box-cicre");
        }
    },
    text_tree: function (data) {
        if (data.level && data.level == 1) {
            var object = $(data.id).parent();
            $(data.id).remove();
        } else {
            $(data.id).siblings(".titles").nextAll().remove();
            if ($(data.id).hasClass("minus")) {
                $(data.id).removeClass("icon-minus minus").addClass("icon-plus plus");
                return false;
            }
            var object = $(data.id).siblings(".titles");
            $(data.id).addClass("icon-minus minus").removeClass("icon-plus plus");
        }
        var html = "<ul>\n";
        $.each(data.data, function (i, v) {
            var items = "",
                classname = ""
            if (v[data.child].length > 0) {
                items = '<i class="iconfont icon-plus plus green" onclick=\'Tree.text_tree({id:this,data:' + JSON.stringify(v[data.child]) + ',title:"' + data.title + '",child:"' + data.child + '"})\'></i>\n';

            }
            if (data.level == 1) {
                classname = "tree-form";
            }
            html += '<li class="' + classname + '">\n' + items + '<span class="titles">' + v[data.title] + '</span>\n</li>\n';
        });
        html += "</ul>"
        if (data.level && data.level == 1) {
            object.html(html);
        } else {
            object.after(html);
        }
    },
    css: function () {
        var css = document.createElement("link"),
            icon = document.createElement("link");
        css.href = "/static/tree/defaults/common.css";
        icon.href = "/static/tree/defaults/iconfont.css";
        css.rel = icon.rel = "stylesheet";
        css.type = icon.type = "text/css";
        var link = document.getElementsByTagName("link")[0];
        link.parentNode.insertBefore(css, link);
        link.parentNode.insertBefore(icon, link);
    }
};
window.Tree = tree;
Tree.css();