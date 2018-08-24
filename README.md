 #使用须知：
 1. verTree是一款开源的用于树菜单插件，当前版本：V1.0.1;
 2. verTree提供免费下载开发版，下载链接请见插件下载板块
 3. 使用verTree前请先修改Tree.css()方法中的css链接地址修改为项目相对路径，verTree提供给了iconfont.css和common.css，修改了链接地址后将会动态加载相关样式路径
 # 方法介绍
 1. table_tree:表格菜单树
 2. form_tree:表单菜单树
 # 属性说明
 1. field：表格树中在thead中的td/th标记中添加该字段，verTree将会自动读取相应字段的数据到指定字段下，格式为：field="name"  
 2. data-icon： 表格对应字段是否是图标文件
 3. data-style: 表格对应字段的样式（css）
 4. data-status: 是否是状态字段，状态字段将自动转换成icon图标，且该字段只接受数字，1为正常，其他数字为非正常状态
 5. data-image：表格字段是否为图片类型，该字段的数据必须是一段有效的文件链接
 # 调用方法
 1. table_tree
 
        Tree.table_tree(
            "",//节点
            {
                value: [],//数据源
                defaults: 0,//默认值
                pk: "id",//主键
                level: "level",//节点标识
                pid:"pid"//父级标识
            }
        );
        
2. form_tree

        Tree.form_tree({
            id:"#power",//加载节点
            data:[], //数据源
            level:1, //等级节点
            child:"children", //子节点名称
            title:"name",  //展示字段
            pk:"id", //主键
            pid:"pid",//父级字段
            defaultValue:[],//默认数据
            kid:"level" //节点字段
        });
 # 插件下载
 [verTree下载中心](https://xincheng-blog.cn/download/verTree.rar)
 # 版权信息
 > Copyright © 2006-2017 by [搬砖的小白](https://www.yum-blog.cn)  
 > All rights reserved。