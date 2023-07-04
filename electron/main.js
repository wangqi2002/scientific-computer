const { app, BrowserWindow } = require('electron')
const path = require("path")

let mainWindow;

const createWindow = () => {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        // 默认窗口标题，如果由loadURL()加载的HTML文件中含有标签<title>，此属性将被忽略。
        title: "scientific-computer",
        width: 800,
        height: 600,
        // 设置最小尺寸
        minWidth: 600,
        minHeight: 450,
        // 窗口图标。 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
        // 在根目录中新建 build 文件夹存放图标等文件
        icon: path.resolve(__dirname, "../src/assets/icon-20.ico"),
    });
    mainWindow.maximize()
    // 使用 loadURL 加载 http://localhost:9527 ，也就是 Vue 项目地址
    mainWindow.loadURL("http://localhost:9527/");
    // 如果使用了 nginx 代理，url 改为代理地址
    //   mainWindow.loadURL("https://example.com/");
};

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
