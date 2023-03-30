$(function () {
	const form = layui.form;
	form.verify({
		nickname: function (value) {
			if (value.trim().length > 6) {
				return "昵称长度必须在1-6个字符之间";
			}
		},
	});
	// 获取用户信息

	function getUserData() {
		$.ajax({
			type: "get",
			url: "/my/userinfo",
			success: function (response) {
				if (response.status === 0 && response.message === "获取用户基本信息成功！") {
					// 快速填充表单
					form.val("userInfo", response.data);
				}
			},
		});
	}
	getUserData();

	$(".reset").on("click", function (e) {
		// 阻止默认行为
		e.preventDefault();
		getUserData();
	});
	// 更改信息
	$(".layui-form").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/my/userinfo",
			data: $(this).serialize(),
			success: function (response) {
				if (response.status === 1) {
					return layer.msg(response.message);
				}
				layer.msg(response.message, { icon: 1 });
			},
		});
		// 父页面方法不能是局部的  入口函数里面的方法访问不到
		window.parent.getUserinfo();
	});
});
