VERTREE.js 1.0
===============

# 一、使用须知：
verTree.js是树形菜单插件，集成了表单/表格树形展示，只需引入js文件即可
# 二、方法介绍
使用verTree.js只需在js中new一个既可以使用，如下面实例：
~~~
new verTree({
     items:"#tree_list",
     type:"data",
     data:[],
     parent:"pid",
     params:"id",
     value:"name"
});  
<table id="tree_list">
 <thead>
 <tr data-tree-list="true" data-tree-changes="true">
     <th data-field="name">名称</th>
     <th data-field="jingle">别名</th>
 </tr>
 </thead>
</table>
~~~ 
# 三、属性说明
1. 接口参数：
    1. items:容器名称（推荐使用id，能够保证只有唯一的一个容器，填写时需要带上修饰符）
    2. type：数据展示的演示，提供三种选项：
        1. data：普通数据展示（没有选择框，只显示相关数据名称）
        2. form：表单数据展示（有选择框，只显示相关数据名称）
        3. table：表格列表数据展示，配合data参数中的data-file进行数据展示
    3. data：原始json数组数据，在数据中必须包含children字段，否则数据树将无法识别
    4. parent: 父级节点字段名称，默认为parent
    5. params：当前节点主键字段名称，默认为id，
    6. value：当type不等于table时页面展示的字段名称，默认为name
2. data参数
    1. 说明：data参数主要用于当type等于table时在表格中添加的相关data参数
    2. data-tree-list: 加载的字段集合数据列表，填写表头tr中
    3. data-tree-changes：是否出现复选框，填写在表头tr中
    4. data-field：当前列加载的字段名称，填写在表头td/th中
    5. 更多data参数正在开放中
# 四、文件目录结构
~~~
www 网站部署目录
|——verJs  verjs文件夹
|————need  样式文件夹
|——————common.css  verjs基础样式
|——————treeIcon.css icon样式
|————verTree.js  verJS文件
~~~
# 五、样式实例
1. [表单样式](https://www.xincheng-blog.cn/tree.form.html)
2. [普通样式](https://www.xincheng-blog.cn/tree.data.html)
2. [表格样式](https://www.xincheng-blog.cn/tree-table.html)
# 版权信息
> Copyright © 2019 by [搬砖的小白](https://www.xincheng-blog.cn)  
> All rights reserved。
