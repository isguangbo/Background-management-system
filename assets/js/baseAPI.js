// 每次调用 $.get() 或$.post() 或$.ajax() 的时候会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
	options.url = "http://www.liulongbin.top:3007" + options.url;
	// 统一设置请求头
	if (options.url.indexOf("/my/") != -1) {
		options.headers = {
			// 获取本地存储token如果没有返回空字符串
			Authorization: localStorage.getItem("token") || "",
		};
	}
	// 身份认证失败不允许访问后台
	options.complete = function (res) {
		console.log(res.responseJSON);
		if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
			localStorage.removeItem("token");
			location.href = "login.html";
		}
	};
});
