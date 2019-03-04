window.verTree = (function () {
    var tree = function (params) {
        //加载css样式
        var path = this.getPath,
            common_css_href = path + "need/common.css?v=1.0&_=" + Math.random(),
            icon_css_href = path + "need/treeIcon.css?v=1.0&_=" + Math.random(),
            common_link = document.createElement("link"),
            icon_link = document.createElement("link");
        common_link.href = common_css_href;
        icon_link.href = icon_css_href;
        common_link.rel = icon_link.rel = "stylesheet";
        common_link.type = icon_link.type = "text/css";
        var link = document.getElementsByTagName("head")[0];
        link.appendChild(common_link);
        link.appendChild(icon_link);
        this.tree = document.querySelector(params.items);
        this.tree.classList.add("tree-" + params.type);
        this.data = params.data;
        this.type = params.type ? params.type : "data";
        this.option = params.option ? params.option : "";
        this.pk = params.parent ? params.parent : "parent";
        this.id = params.params ? params.params : "id";
        this.name = params.name ? params.name : "name";
        switch (this.type) {
            case "list":
                this.thead = (this.tree).querySelector('[data-tree-list="true"]');
                this.table_tree();
                break;
            case "form":
                this.items();
                break;
            default:
                this.items();
                break;
        }
    };
    tree.prototype = {
        getPath: function () {
            var jsPath = document.currentScript ? document.currentScript.src : function () {
                var js = document.scripts
                    , last = js.length - 1
                    , src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
        items: function () {
            this.tree.classList.add("tree-form-box");
            this.tree_data(this.data, 0);
            if (this.type == "form") {
                this.checkInput();
            }
            this.tree_options_list();
        },
        tree_data: function (data, level, cl) {
            var ul = document.createElement("ul");
            var f = level + 1;
            var icons = icon = "";
            for (var i in data) {
                var d = data[i];
                if (d.children.length > 0) {
                    icon = "<i class='verTreeIcon icon-minus green tree-option'></i>";
                }

                if (this.type == "form") {
                    icons = "<span><i class='verTreeIcon icon-check-box blue ver-tree-check ver-tree-checks'></i><input type='checkbox' name='" + this.id + "[]' value='" + d[this.id] + "' style='display: none'></span> "
                }
                var li = document.createElement("li");
                li.setAttribute("data-parent", d[this.pk]);
                li.setAttribute("data-id", d[this.id]);
                li.setAttribute("data-level", level);
                li.innerHTML = icon + icons + d[this.name];
                li.className = "ver-tree-levels ver-tree-level-" + level + " tree-parent-" + d[this.pk];
                ul.appendChild(li);
                if (cl) {
                    cl.appendChild(ul);
                } else {
                    this.tree.appendChild(ul);
                }
                if (d.children.length > 0) {
                    this.tree_data(d.children, f, li);
                }
            }
        },
        /*
         * 表格列表以树形菜单排列
         */
        table_tree: function () {
            var child = this.thead.querySelectorAll("[data-field]");
            var changes = this.thead.getAttribute("data-tree-changes");
            if (changes) {
                var cha = document.createElement("th");
                cha.innerHTML = "<i class='verTreeIcon icon-check-box blue ver-tree-check-all ver-tree-checks'></i>";
                cha.width = 30;
                this.thead.insertBefore(cha, this.thead.children[0])
            }
            var chas = document.createElement("th");
            this.thead.insertBefore(chas, this.thead.children[0]);
            chas.style.width = "5em";
            var html = this.list_item(this.data, child, 0, changes);
            var tbody = document.createElement("tbody");
            tbody.innerHTML = html;
            this.tree.appendChild(tbody);
            this.tree_options_list();
            this.checkInput();
        },
        /*
         * 表格数据处理
         */
        list_item: function (info, child, level, changes, objs) {
            var html = "";
            var l = "";
            if (level > 0) {
                l = "|";
                for (var j = 0; j < level; j++) {
                    l += "——"
                }
            }
            var sel = this;
            for (var i in info) {
                var data = info[i];
                var childs = "";
                var _h = "";
                if (level > 0) {
                    _h = l;
                }
                if (data.children.length > 0) {
                    _h += "<i class='verTreeIcon icon-plus green tree-option'></i>";
                    childs = JSON.stringify(data.children);
                }
                var cl = "";
                if (data[this.pk] > 0) {
                    cl = " tree-parent-" + data[this.pk];
                }
                if (!objs) {
                    html += "<tr class='ver-tree-levels ver-tree-level-" + level + cl + "' data-parent='" + data[this.pk] + "' data-id='" + data[this.id] + "'><td data-levels='" + level + "'>" + _h + "<children-jsons>" + childs + "</children-jsons></td>";
                    if (changes) {
                        html += "<td align='center'><i class='verTreeIcon icon-check-box blue ver-tree-check ver-tree-checks'></i><input type='checkbox' name='" + this.id + "[]' value='" + data[this.id] + "' style='display: none'></td>"
                    }
                    child.forEach(function (item) {
                        var file = item.getAttribute("data-field");
                        html += '<td>' + data[file] + '</td>';
                    });
                    html += "</tr>";
                } else {
                    var te = document.createElement("tr");
                    te.className = "ver-tree-levels ver-tree-level-" + level + cl;
                    te.setAttribute("data-parent", data[this.pk]);
                    te.setAttribute("data-id", data[this.id]);
                    html = "<td data-levels='" + level + "'>" + _h + "<children-jsons>" + childs + "</children-jsons></td>";
                    if (changes) {
                        html += "<td align='center'><i class='verTreeIcon icon-check-box blue ver-tree-check ver-tree-checks'></i><input type='checkbox' name='" + this.id + "[]' value='" + data[this.id] + "' style='display: none'></td>"
                    }
                    child.forEach(function (item) {
                        var file = item.getAttribute("data-field");
                        html += '<td>' + data[file] + '</td>';
                    });
                    te.innerHTML = html;
                    sel.insertAfter(te, objs);
                }
            }

            return html;
        },
        insertAfter: function (newElement, targentElement) {
            var parent = targentElement.parentNode;
            if (parent.lastChild == targentElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targentElement.nextSibling)
            }
        },
        /*
         * 收缩菜单控件
         */
        tree_options_list: function () {
            if (this.type == "list") {
                var child = this.thead.querySelectorAll("[data-field]");
                var changes = this.thead.getAttribute("data-tree-changes");
            }
            var options = this.tree.querySelectorAll(".tree-option");
            var _self = this;
            options.forEach(function (item) {
                item.onclick = function (e) {
                    if (this.type == "list") {
                        var level = parseInt(this.parentElement.getAttribute("data-levels"));
                        var id = (this.parentElement.parentElement.getAttribute("data-id"));
                        var data = this.parentElement.querySelector("children-jsons").innerHTML;
                        data = JSON.parse(data);
                        var tr = this.parentElement.parentElement;
                        var clss = _self.tree.getElementsByClassName("tree-parent-" + id);
                        //判断当前是否存在icon-plus
                        if (this.classList.contains("icon-plus")) {
                            level = parseInt(level) + 1;
                            _self.list_item(data, child, level, changes, tr);
                            this.classList.remove("icon-plus");
                            this.classList.add("icon-minus");
                            _self.tree_options_list();
                            _self.checkInput();
                        } else {
                            this.classList.add("icon-plus");
                            this.classList.remove("icon-minus");
                            for (var i = clss.length - 1; i >= 0; i--) {
                                clss[i].parentNode.removeChild(clss[i]);
                            }
                        }
                    } else {
                        // var id = parseInt(this.parentElement.parentElement.getAttribute("data-level"));
                        var ul = (this.parentElement.querySelector("ul"));
                        if(this.classList.contains("icon-plus")){
                            this.classList.remove("icon-plus");
                            this.classList.add("icon-minus");
                            ul.classList.remove("ver-tree-levels-hide");
                        }else{
                            this.classList.add("icon-plus");
                            this.classList.remove("icon-minus");
                            ul.classList.add("ver-tree-levels-hide");
                        }
                    }
                }
            });
        },
        /*
         * 全选&反选
         */
        checkInput: function () {
            var inputs = this.tree.querySelectorAll(".ver-tree-checks"),
                _self = this;
            inputs.forEach(function (item) {
                item.onclick = function () {
                    if (_self.type == "list") {
                        var ins = _self.tree.querySelectorAll(".ver-tree-check"),
                            all = _self.tree.querySelector(".ver-tree-check-all");
                        //判断是否是选中状态；
                        if (this.classList.contains("icon-check-box-cicre")) {
                            this.classList.add("icon-check-box");
                            this.classList.remove("icon-check-box-cicre");
                            //判断是全选还是单选
                            if (this.classList.contains("ver-tree-check-all")) {
                                ins.forEach(function (it) {
                                    it.classList.add("icon-check-box");
                                    it.classList.remove("icon-check-box-cicre");
                                    it.parentElement.querySelector("input[type=checkbox]").checked = false;
                                });
                            } else {
                                this.parentElement.querySelector("input[type=checkbox]").checked = false;
                                all.classList.remove("icon-check-box-cicre");
                                all.classList.add("icon-check-box");

                            }
                        } else {
                            this.classList.remove("icon-check-box");
                            this.classList.add("icon-check-box-cicre");
                            //判断是全选还是单选
                            if (this.classList.contains("ver-tree-check-all")) {
                                ins.forEach(function (it) {
                                    it.classList.add("icon-check-box-cicre");
                                    it.classList.remove("icon-check-box");
                                    it.parentElement.querySelector("input[type=checkbox]").checked = true;
                                });
                            } else {
                                this.parentElement.querySelector("input[type=checkbox]").checked = true;

                                //判断是否全部选中
                                var name = this.parentElement.querySelector("input[type=checkbox]").name,
                                    check_len = _self.tree.querySelectorAll("input[name='" + name + "']:checked").length,
                                    length = ins.length;
                                if (check_len == length) {
                                    all.classList.remove("icon-check-box");
                                    all.classList.add("icon-check-box-cicre");
                                } else {
                                    all.classList.remove("icon-check-box-cicre");
                                    all.classList.add("icon-check-box");
                                }
                            }
                        }
                    } else if (_self.type == "form") {
                        var id = this.parentElement.parentElement.getAttribute("data-id"),
                            parent = this.parentElement.parentElement.getAttribute("data-parent"),
                            childrends = _self.tree.querySelectorAll(".tree-parent-" + id),
                            levels = parseInt(this.parentElement.parentElement.getAttribute("data-level")),
                            // tops = _self.tree.querySelectorAll(".ver-tree-level-0"),
                            p = _self.tree.querySelector("[data-id='" + parent + "']");
                        // l = 0;
                        //判断是否选中状态
                        if (this.classList.contains("icon-check-box-cicre")) {
                            this.classList.remove("icon-check-box-cicre");
                            this.classList.add("icon-check-box");
                            this.parentElement.querySelector("input[type=checkbox]").checked = false;
                            if (childrends.length > 0) {
                                childrends.forEach(function (items) {
                                    items.querySelectorAll(".ver-tree-checks").forEach(function (it) {
                                        it.classList.remove("icon-check-box-cicre");
                                        it.classList.add("icon-check-box");
                                        it.parentElement.querySelector("input[type=checkbox]").checked = false;
                                    });
                                })
                            }
                        } else {
                            this.classList.remove("icon-check-box");
                            this.classList.add("icon-check-box-cicre");
                            this.parentElement.querySelector("input[type=checkbox]").checked = true;
                            if (levels > 0) {
                                var ls = levels - 1;
                                _self.tops(ls, id);
                            }

                            if (childrends.length > 0) {
                                childrends.forEach(function (items) {
                                    items.querySelectorAll(".ver-tree-checks").forEach(function (it) {
                                        it.classList.remove("icon-check-box");
                                        it.classList.add("icon-check-box-cicre");
                                        it.parentElement.querySelector("input[type=checkbox]").checked = true;
                                    })
                                })
                            }
                        }
                    }
                }

            });
        },
        tops: function (levels, id) {
            var tops = document.querySelectorAll(".ver-tree-level-" + levels);

            if (tops.length > 0) {
                tops.forEach(function (item) {
                    if (item.querySelectorAll("[data-id='" + id + "']").length > 0) {
                        var icons = item.querySelector(".ver-tree-checks");
                        icons.classList.remove("icon-check-box");
                        icons.classList.add("icon-check-box-cicre");
                        icons.parentElement.querySelector("input[type=checkbox]").checkbox = true;
                    }
                });
                if (levels >= 0) {
                    this.tops((levels - 1), id);
                }
            } else {
                return false;
            }
        }
    };
    return tree;
})();