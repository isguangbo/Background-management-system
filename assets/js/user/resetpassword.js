$(function () {
	const form = layui.form;
	// 密码验证规则
	form.verify({
		pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
		samePwd: function (value) {
			if (value === $("[name=oldPwd]").val()) {
				return "新密码和旧密码不能相同";
			}
		},
		rePwd: function (value) {
			if (value !== $("[name=newPwd]").val()) {
				return "输入的密码不一致";
			}
		},
	});
	// 修改密码
	function resetPassword() {
		$(".layui-form").submit(function (e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/my/updatepwd",
				//获取表单区域所有值
				data: form.val("reset"),
				success: function (response) {
					if (response.status != 0) {
						return layer.msg(response.message);
					} else {
						layer.msg(response.message);
						$(".reset").click();
					}
				},
			});
		});
	}
	resetPassword();
});
