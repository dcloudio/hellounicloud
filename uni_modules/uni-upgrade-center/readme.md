# uni-upgrade-center - Admin

### 概述

> 统一管理App及App在`Android`、`iOS`平台上`App安装包`和`wgt资源包`的发布升级

> 本插件为升级中心Admin后台管理系统，前台检查更新函数请点击查看 [uni-upgrade-center-app](https://ext.dcloud.net.cn/plugin?id=4542)

### 基于uniCloud的App升级中心，本插件具有如下特征：
  - 云端基于uniCloud云函数实现
  - 数据库遵循opendb规范
  - 遵循uniCloud Admin框架规范，可直接导入Admin项目中
  - 支持App整包升级及wgt资源包升级

## 什么是 uniCloud

uniCloud 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台，更多请参考[uniCloud 文档](https://uniapp.dcloud.io/uniCloud)。

## 升级中心解决了什么问题？

升级中心是一款uniCloud admin插件，负责App版本更新业务。包含后台管理界面、更新检查逻辑，App内只要调用弹出提示即可。

升级中心有以下功能点：

- 应用管理，对App的信息记录和应用版本管理
- 版本管理，可以发布新版，也可方便直观的对当前App历史版本以及线上发行版本进行查看、编辑和删除操作
- 版本发布信息管理，包括 更新标题，更新内容，版本号，静默更新，强制更新，灵活上线发行 的设置和修改
- 原生App安装包，发布Apk更新，用于App的整包更新，可设置是否强制更新
- wgt资源包，发布wgt更新，用于App的热更新，可设置是否强制更新，静默更新
- App管理列表及App版本记录列表搜索

只需导入插件，初始化数据库即可拥有上述功能。

您也可以自己修改逻辑自定义数据库字段，和随意定制 UI 样式。

## 安装指引

1. 使用`HBuilderX 3.1.0+`，因为要使用到`uni_modules`

2. 使用已有`uniCloud-admin`项目或新建项目：`打开HBuilderX` -> `文件` -> `新建` -> `项目` -> `uni-app` 选择 `uniCloud admin`模板，键入一个名字，确定

3. 在插件市场打开本插件页面，在右侧点击`使用 HBuilderX 导入插件`，选择 `uniCloud admin` 项目点击确定

4. 等待下载安装完毕。由于本插件依赖一些uni-ui插件，下载完成后会显示合并插件页面，自行选择即可

5. 找到`/uni_modules/uni-upgrade-center/uniCloud/cloudfunctions/upgrade-center`，右键上传部署

6. 找到`/uni_modules/uni-upgrade-center/uniCloud/database/db_init.json`，右键初始化数据库

7. 在`pages.json`中添加页面路径
```json
//此结构与uniCloud admin中的pages.json结构一致
"pages": [
			// ……其他页面配置
			{
				"path": "uni_modules/uni-upgrade-center/pages/version/list",
				"style": {
					"navigationBarTitleText": "版本列表"
				}
			}, {
				"path": "uni_modules/uni-upgrade-center/pages/version/add",
				"style": {
					"navigationBarTitleText": "新版发布"
				}
			}, {
				"path": "uni_modules/uni-upgrade-center/pages/version/detail",
				"style": {
					"navigationBarTitleText": "版本信息查看"
				}
			}, {
				"path": "uni_modules/uni-upgrade-center/pages/app/list",
				"style": {
					"navigationBarTitleText": "应用列表"
				}
			}, {
				"path": "uni_modules/uni-upgrade-center/pages/app/detail",
				"style": {
					"navigationBarTitleText": "应用信息查看"
				}
			}, {
				"path": "uni_modules/uni-upgrade-center/pages/app/add",
				"style": {
					"navigationBarTitleText": "新增应用"
				}
			}
]
```

8. 在`manifest.json -> 源码视图`中添加以下配置：
	```js
	"networkTimeout":{
		"uploadFile":1200000	//ms， 如果不配置，上传大文件可能会超时
	}
	```

9. 运行项目到`Chrome`

10. 运行起来uniCloud admin，菜单管理模块会自动读取`/uni_modules/uni-upgrade-center/menu.json`文件中的菜单配置，生成【待添加菜单】，选中升级中心，点击`添加选中的菜单`即可

<div align="center">
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/9ad0469a-bf49-4d02-b061-1fdf99542154.png" width="800"></img>
</div>

11. 添加成功后，就可以在左侧的菜单栏中找到`升级中心`菜单

<div align="center">
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/8056ce22-be40-4fd6-bb5b-a8d398eaedee.png" width="300"></img>
</div>

12. 由于插件依赖的uni-ui的一些组件，建议右键`/uni_modules/uni-upgrade-center`安装一下第三方依赖，否则可能会出现一些问题

## 使用指南

### 升级中心

#### 应用列表

1. 点击菜单`升级中心`进入`应用管理`，这里展示你所添加的 App，点击右上角 `新增应用` 可以新增一个 App

<div align="center">
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/03a5ac58-1eb4-4c68-8d11-20ebbe3abe38.png" width="400"></img>
</div>

2. 将App的信息都填写完善后，你可以在列表的操作列进行`查看`、`修改`应用信息或者`删除`该应用。

**Tips**
- 删除应用会把该应用的所有版本记录同时删除

#### 版本管理
1. 在版本管理list的右上角点击`发布新版`，可以发布`原生App安装包`和`wgt资源包`

<div align="center">
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/70f8c241-13d6-4e49-ac39-eee7f97fcea1.png" width="800"></img>
</div>

- #### 发布原生App安装包
	1. 在上传安装包界面填写此次发版信息

	<div align="center" >
	<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/abb84294-0931-4089-a8c5-3d6e7c354d4d.png" width="400"></img>
	</div>

	2. `包地址`
		- 可以选择手动上传一个文件到 `云存储`，会自动将地址填入该项
		
		- 也可以手动填写一个地址，就可以不用再上传文件
		
		- 如果是发布`苹果`版本，包地址则为 应用在`AppStore的链接`
		
	3. `强制更新`
		- 如果使用强制更新，App端接收到该字段后，App升级弹出框不可取消
		
	4. `上线发行`
		- 可设置当前包是否上线发行，只有已上线才会进行更新检测
		
		- 同时只可有一个线上发行版，线上发行不可更设为下线。未上线可以设为上线发行并自动替换当前线上发行版
		
		- 修改当前包为上线发行，自动替换当前线上发行版

- #### 发布wgt资源包
	1. 大部分配置与发布 `原生App安装包` 一致

	<div align="center">
	<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/b872f3db-c859-410a-9e0f-a4a6a7767d5e.png" width="400"></img>
	</div>

	2. `原生App最低版本`
		- 上次使用新Api或打包新模块的App版本
		
		- 如果此次打包wgt使用了`新的api`或者打包了`新的模块`，则在发布 `wgt资源包` 的时候，将此版本更新为本次版本
		
		- 如果已有正式版`wgt资源包`，则本次新增会自动带出

	2. `静默更新`
		- App升级时会在后台下载wgt包并自行安装。新功能在下次启动App时生效

- #### 发布完成页面

	<div align="center">
	<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8ed92fab-502d-4290-af3c-1d65c4dbfc4d/42742d4d-ccbb-4c3e-bd37-d12d0439817c.png" width="800"></img>
	</div>

**Tips**

1. `pages/system/upgradecenter/version/add.vue`中有版本对比函数（compare）。
	- 使用多段式版本格式（如："3.0.0.0.0.1.0.1", "3.0.0.0.0.1"）。如果不满足对比规则，请自行修改。

## 项目代码说明

### uniCloud 数据表

数据表基于 [openDB](https://gitee.com/dcloud/opendb/tree/master) 规范，它约定了一个标准用户表的表名和字段定义，并且基于 nosql 的特性，可以由开发者自行扩展字段。

本项目用到了 2 个表：

- opendb-app-list：app管理列表。记录应用的 appid、name、description 用于展示。[详见](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-app-list)
- opendb-app-versions：应用版本管理表。记录管理应用的版本信息。[详见](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-app-versions)

### 前端页面

点击`升级中心`，会进入应用管理列表，在这里你可以新增应用，或者在`应用详情`中查看、修改或删除一个已经录入的应用。

在应用管理列表中点击某个应用的`版本管理`，进入该应用的所有版本记录。列表排序为：先排序已上线版本，剩下已下线版本根据创建时间排列。

在应用版本列表中点击`详情`，即可进入该版本的信息详情中查看、修改或删除该记录。
