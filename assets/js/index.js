$(function () {
	// 拿到用户信息
	getUserinfo();
	// 点击按钮，实现退出功能
	$(".exit").on("click", function () {
		layer.confirm("确定要退出登录吗？   ", { icon: 7, title: "提示" }, function (index) {
			// 清空本地存储
			localStorage.removeItem("token");
			location.href = "login.html";

			layer.close(index);
		});
	});
});
function getUserinfo() {
	$.ajax({
		type: "get",
		url: "/my/userinfo",
		success: function (response) {
			if (response.status != 0) {
				return layer.msg(response.message);
			}
			// 调用渲染用户头像
			renderAvatar(response.data);
		},
	});
}
// 渲染用户头像;
function renderAvatar(userinfo) {
	// 获取用户名称
	const name = userinfo.nickname || userinfo.username;
	// 设置欢迎文本
	$(".welcome").html(name + "Welcome");
	// 渲染用户头像
	if (userinfo.user_pic !== null) {
		// 有头像信息显示头像
		$(".layui-nav-img").attr("src", userinfo.user_pic).show();
		$(".text-avatar").hide();
	} else {
		// 没有头像显示文本头像
		$(".layui-nav-img").hide();
		const firstSring = name[0].toUpperCase();
		$(".text-avatar").html(firstSring).show();
	}
}
