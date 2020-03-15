const {
	app,
	BrowserWindow,
	BrowserView,
	Menu,
	dialog
} = require('electron')

const path = require('path')

const view_pe = null;

const template = [{
	label: "文件",
	submenu: [{
			label: "打开二进制文件",
			click: function (event, focusedWindow, focusedWebContents) {
				let path = dialog.showOpenDialogSync({
					title: "打开",
					filters: [{
							name: "exe文件",
							extensions: ["exe"]
						},
						{
							name: "dll文件",
							extensions: ["dll"]
						},
						{
							name: "sys文件",
							extensions: ["sys"]
						}
					],
					properties: ["openFile"]
				})
				if (path == undefined)
					return;
				console.log(path);
				focusedWindow.webContents.send('message', {
					command: 'show-open-file',
					path: path[0]
				})
			}
		},
		{
			role: 'toggledevtools'
		},
	]
}, {
	label: "PE概述",
	submenu: [{
		label: '文件信息',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-file-attr'
			})
		}
	}, {
		label: '映像信息',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-pe-attr'
			})
		}
	}, {
		type: 'separator'
	}, {
		label: 'DOS头',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-dos-header'
			})
		}
	}, {
		label: '文件头',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-file-header'
			})
		}
	}, {
		label: '可选头',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-optional-header'
			})
		}
	}, {
		label: '节表',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-section-table'
			})
		}
	}, {
		type: 'separator'
	}, {
		label: '导入表',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-import-directory'
			})
		}
	}, {
		label: '导出表',
		click: function (event, focusedWindow, focusedWebContents) {
			focusedWindow.webContents.send('message', {
				command: 'show-export-directory'
			})
		}
	}]
}]

function createWindow() {
	// 创建浏览器窗口
	let win = new BrowserWindow({
		title: "Redox",
		backgroundColor: '#ffffff',
		show: false,
		icon: path.join(__dirname, "res/img/logo.png"),
		webPreferences: {
			//preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			defaultFontSize: 12
		}
	})
	win.loadFile('res/static/index.html')
	win.maximize()
	win.show();

	//win.resizable = false;
	// pe_view = new BrowserView();
	// win.setBrowserView(pe_view);

	// pe_view.webContents.loadFile('res/static/index.html')
	// pe_view.setBounds({
	// 	x: 0,
	// 	y: 0,
	// 	width: 1200,
	// 	height: 800
	// })
	// console.log(pe_view.webContents);
	//
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow)