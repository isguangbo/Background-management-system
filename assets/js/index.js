$(function () {
	// 拿到用户信息
	// 初始化
	function init() {
		$(".text-avatar").hide();
		$(".layui-nav-img").hide();
	}
	init();
	getUserinfo();
	function getUserinfo() {
		$.ajax({
			type: "get",
			url: "/my/userinfo",
			// 请求头配置字段

			success: function (response) {
				if (response.status != 0) {
					return layer.msg(response.message);
				}
				// 渲染用户头像
				renderAvatar(response.data);
			},
		});
	}
	// 渲染用户头像
	function renderAvatar(userinfo) {
		// 用户名
		const name = userinfo.nickname || userinfo.username;
		// 设置欢迎文本
		$(".welcome").html(name + "Welcome");
		// 渲染用户头像
		if (userinfo.user_pic) {
			// 有头像信息显示头像
			$(".text-avatar").hide();
			$(".layui-nav-img").show();
		}
		// 没有头像显示文本头像
		$(".text-avatar").show();
		$(".layui-nav-img").hide();
		const firstSring = name[0].toUpperCase();
		$(".text-avatar").html(firstSring);
	}
	$(".exit").on("click", function () {
		layer.confirm("确定要退出登录吗？   ", { icon: 7, title: "提示" }, function (index) {
			// 清空本地存储
			localStorage.removeItem("token");
			location.href = "login.html";

			layer.close(index);
		});
	});
});
