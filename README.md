# CodePlus
editorjs-quoted工具是Editor.js的引述文字插件
# 安装
```
npm i -D editorjs-quoted

```
或者直接[下载源码](https://github.com/xiaogonggong-w/editorjs-quoted.git),使用dist/bundle.js.
# 使用

```
import Quoted from 'editorjs-quoted' 
```

# 使用
```

var editor = EditorJS({
  ...
  
  tools: {
    quoted: {
      class: Quoted,
      config:{
        placeholder:"占用文本",
        defaultType:"info",
      }
    },
  }
  
  ...
});

```

# 配置参数
| 字段  |  类型   | 描述 |
| ---- | ---- | ---- |
| placeholder | string | 插件的占位文本 |
| defaultType | string |       'primary','secondary','info','success','warning','danger', 'light','dark', 任选其一|

# 输入的数据
```

{
    "time": 1678006102022,
    "blocks": [
        {
            "id": "s-IbXvCx7L",
            "type": "quoted",
            "data": {
                "text": " 这是一个quoted插件",
                "type": "danger"
            }
        }
    ],
    "version": "2.26.5"
}
```
