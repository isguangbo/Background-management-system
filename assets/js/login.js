$(function () {
	// 引入layui模块
	const form = layui.form;
	const layer = layui.layer;
	$("#login").on("click", function () {
		$(".login").hide();
		$(".register").show();
	});
	$("#register").on("click", function () {
		$(".register").hide();
		$(".login").show();
	});
	// 表单验证
	form.verify({
		username: function (value, item) {
			//value：表单的值、item：表单的DOM对象
			if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
				return "用户名不能有特殊字符";
			}
			if (/(^\_)|(\__)|(\_+$)/.test(value)) {
				return "用户名首尾不能出现下划线'_'";
			}
			if (/^\d+\d+\d$/.test(value)) {
				return "用户名不能全为数字";
			}

			//如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
			if (value === "xxx") {
				alert("用户名不能为敏感词");
				return true;
			}
		},

		//我们既支持上述函数式的方式，也支持下述数组的形式
		//数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
		pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
		repwd: function (value) {
			let pwd = $(".register [name=password]").val();
			if (pwd != value) {
				return "两次密码不一致";
			}
		},
	});
	// 监听注册表单的提交事件
	$("#registerForm").submit(function (e) {
		e.preventDefault();
		// 获取表单中提交的数据 类型为数组
		const data = $(this).serializeArray();
		// 将数组转换为对象 以键值对的方式存在
		const dataObj = {};
		data.forEach(function (params) {
			dataObj[params.name] = params.value;
		});
		$.ajax({
			type: "POST",
			url: "/api/reguser",
			data: {
				// username: $("#registerForm [name=username]").val(),
				// password: $("#registerForm [name=password]").val(),
				username: dataObj.username,
				password: dataObj.password,
			},
			success: function (response) {
				if (response.status != 0) {
					return layer.msg(response.message);
				}
				layer.msg(
					"注册成功，请登录！",
					{
						icon: 1,
						time: 1000, //默认是3秒关闭
					},
					// 弹窗提示后做的操作
					function () {
						// 跳转登录页面
						$("#register").click();
						// 自动填充用户名，密码
						// $("#loginForm [name=username]").val($("#registerForm [name=username]").val());
						// $("#loginForm [name=password]").val($("#registerForm [name=password]").val());
						$("#loginForm [name=username]").val(dataObj.username);
						$("#loginForm [name=password]").val(dataObj.password);
					}
				);
			},
		});
	});
	// 监听登录表单的提交事件
	$("#loginForm").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/api/login",
			// 获取表单数据 this指向$("#loginForm")
			data: $(this).serialize(),
			success: function (response) {
				if (response.status != 0) {
					// return layer.msg(response.message);
					return layer.msg(response.message);
				}
				layer.msg(
					response.message,
					{
						icon: 1,
						time: 1000,
					},
					function () {
						// 将登陆成功得到的token字符串保存到localStorage中
						localStorage.setItem("token", response.token);
						// 相对于html文件
						location.href = "index.html";
						// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzkyOCwidXNlcm5hbWUiOiJzczExMSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjgwMDc2MDUzLCJleHAiOjE2ODAxMTIwNTN9.UGZPv2ltQ6S8g6YapOGKMj5dxu27iAOgTJ_Ud_YU_wQ
					}
				);
			},
		});
	});
});
