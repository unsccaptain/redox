const {
	app,
	BrowserWindow,
	BrowserView,
	Menu,
	dialog,
	ipcMain,
	GPUFeatureStatus
} = require('electron')
const path = require('path')

let mainWindow;

global.session = {
	filename: ""
}

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
					}, {
						name: "dll文件",
						extensions: ["dll"]
					}, {
						name: "sys文件",
						extensions: ["sys"]
					}],
					properties: ["openFile"]
				})
				if (path == undefined)
					return;
				global.session.filename = path[0];
				mainWindow.reload();
			}
		},
		{
			role: 'toggledevtools'
		},
	]
	// }, {
	// 	label: "PE概述",
	// 	submenu: [{
	// 		label: '文件信息',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-file-attr'
	// 			})
	// 		}
	// 	}, {
	// 		label: '映像信息',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-pe-attr'
	// 			})
	// 		}
	// 	}, {
	// 		type: 'separator'
	// 	}, {
	// 		label: 'DOS头',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-dos-header'
	// 			})
	// 		}
	// 	}, {
	// 		label: '文件头',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-file-header'
	// 			})
	// 		}
	// 	}, {
	// 		label: '可选头',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-optional-header'
	// 			})
	// 		}
	// 	}, {
	// 		label: '节表',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-section-table'
	// 			})
	// 		}
	// 	}, {
	// 		type: 'separator'
	// 	}, {
	// 		label: '导入表',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-import-directory'
	// 			})
	// 		}
	// 	}, {
	// 		label: '导出表',
	// 		click: function (event, focusedWindow, focusedWebContents) {
	// 			focusedWindow.webContents.send('message', {
	// 				command: 'show-export-directory'
	// 			})
	// 		}
	// 	}]
}]

function createWindow() {
	// 创建浏览器窗口
	mainWindow = new BrowserWindow({
		title: "Redox",
		backgroundColor: '#ffffff',
		show: false,
		icon: path.join(__dirname, "./logo.png"),
		webPreferences: {
			//preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			defaultFontSize: 12
		}
	})

	mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
	mainWindow.maximize()
	mainWindow.show();
	// mainWindow.webContents.openDevTools({
	// 	mode: 'detach'
	// })
}

ipcMain.on("analysis-create", (event, args) => {
	global.session.filename = args;
	mainWindow.reload();
})

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow)