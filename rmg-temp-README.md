API Document
==================
![jwi-logo](http://www.jwis.cn/web_file/images/logo2.png "jwi-logo")  
> Version: v0.0.1  
ModifyTime: 2016-10-09 10:50:17  
Host:
https://www.example.com/  

## 目录


[接口访问说明](#)
-----------------------
* 所有的请求，全部带上 `device-type` 请求头，值可为: `browser`, 或者 `mobile`
* 除`/api/public/common` 该控制器，其他所有的请求，都必须带上 `token`, 如果是浏览器，浏览器会自动把`token` 上传回服务器， 如果是手机，需要手动添加 一个 名为 `token` 的 `header`

[错误处理](#)
------------------------
* HTTP 协议定义的错误 (500-530)  
  500-530 : 通用服务器错误，Eg: 501， 502  
  500:服务器异常,ServerError  
* 自定义公共的错误(530-550)  
  530-550:自定义常规错误，Eg: ActionNotFound,ParameterError  
  531:ParameterError, 参数错误  
  532:ActionNotFound,为找到对应的Action  
  533:缺少token,TokenMissing  
  534:未找到控制器,ControllerNotFound  
  535:请求的URL不合法,RequestUrlNotMatch  
  536:请求的 content-type 类型不合法,ContentTypeNotCorrect  
* 自定义错误，只要同一接口中不重复即可(550-600)  
  550-600:自定义错误, 用户名或密码不正确，特定的业务错误  


[宏定义](#宏定义)
-----------------
## 创建宏

### 路径
 - path：`/api/process/macro/create`
 - method：post

### 参数

#### userId
 - 类型：string
 - 描述：用户ID

#### macroName
 - 类型：string
 - 描述：宏名称

#### [macroCommand]
 - 类型：String
 - 描述：宏命令



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 读取宏

### 路径
 - path：`/api/process/macro/read`
 - method：get

### 参数

#### userId
 - 类型：string
 - 描述：用户ID



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 修改宏

### 路径
 - path：`/api/process/macro/update`
 - method：post

### 参数

#### userId
 - 类型：string
 - 描述：用户ID

#### macroName
 - 类型：String
 - 描述：宏名称

#### [macroCommand]
 - 类型：String
 - 描述：宏命令

#### macroId
 - 类型：String
 - 描述：宏ID



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 删除宏

### 路径
 - path：`/api/process/macro/destroy`
 - method：post

### 参数

#### userId
 - 类型：string
 - 描述：用户ID

#### macroId
 - 类型：String
 - 描述：宏ID



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```

[聚合信息](#聚合信息)
-----------------
## 创建聚合信息

### 路径
 - path：`/api/process/Polymer/create`
 - method：post

### 参数

#### userId
 - 类型：string
 - 描述：用户ID

#### juheName
 - 类型：string
 - 描述：聚合名称

#### juheUrl
 - 类型：string
 - 描述：聚合网址

#### juheTop
 - 类型：String
 - 描述：坐标上

#### juheLeft
 - 类型：String
 - 描述：坐标左

#### juheWidth
 - 类型：String
 - 描述：聚合宽

#### juheHeight
 - 类型：String
 - 描述：聚合高

#### [scroltop]
 - 类型：String
 - 描述：滚动上

#### [scrolleft]
 - 类型：String
 - 描述：滚动左

#### [scrollHeight]
 - 类型：String
 - 描述：滚动的高度

#### [scrollWidth]
 - 类型：String
 - 描述：滚动的宽度



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 获取取用户下的聚合信息

### 路径
 - path：`/api/process/Polymer/read`
 - method：get

### 参数

#### userId
 - 类型：string
 - 描述：用户ID



### 返回值
 - 类型：Array
 - 描述：用户下的聚合信息
 - 示例：
```

```
## 修改聚合信息

### 路径
 - path：`/api/process/Polymer/update`
 - method：post

### 参数

#### juheId
 - 类型：Number
 - 描述：聚合ID



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 删除聚合信息

### 路径
 - path：`/api/process/Polymer/destroy`
 - method：post

### 参数

#### juheName
 - 类型：String
 - 描述：聚合名称



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```

[流程](#流程)
-----------------
## 创建一个process

### 路径
 - path：`/api/process/process/create`
 - method：post

### 参数

#### userId
 - 类型：Number
 - 描述：userId

#### imgUrl
 - 类型：string
 - 描述：图标

#### proName
 - 类型：string
 - 描述：流程名字

#### isParent
 - 类型：Boolean
 - 描述：是否是父流程

#### queryString
 - 类型：String
 - 描述：JSON串



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 获取process

### 路径
 - path：`/api/process/process/read`
 - method：get

### 参数

#### userId
 - 类型：Number
 - 描述：userId



### 返回值
 - 类型：无
 - 描述：process流程信息
 - 示例：
```

```
## 重命名process

### 路径
 - path：`/api/process/process/update`
 - method：post

### 参数

#### processId
 - 类型：Number
 - 描述：流程ID

#### [name]
 - 类型：String
 - 描述：新名称

#### [icon]
 - 类型：String
 - 描述：新图标路径

#### [json]
 - 类型：String
 - 描述：新的json

#### [isParent]
 - 类型：Boolean
 - 描述：是否是父流程



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```
## 删除process

### 路径
 - path：`/api/process/process/destroy`
 - method：post

### 参数

#### processId
 - 类型：Number
 - 描述：流程ID



### 返回值
 - 类型：无
 - 描述：无
 - 示例：
```

```

[附件管理](#附件管理)
-----------------
## 文件上传

### 路径
 - path：`/api/public/attachment/upload`
 - method：post

### 参数

#### module
 - 类型：string
 - 描述：文件所述模块, 例如：module=sys

#### files
 - 类型：file[]
 - 描述：上传的文件，多个



### 返回值
 - 类型：string
 - 描述：以逗号分割的附件ID, 例如：1,2,3
 - 示例：
```

```
## 文件下载

### 路径
 - path：`/api/public/attachment/download`
 - method：get

### 参数

#### id
 - 类型：int
 - 描述：要下载的附件 id



### 返回值
 - 类型：stream
 - 描述：返回的文件流
 - 示例：
```

```
