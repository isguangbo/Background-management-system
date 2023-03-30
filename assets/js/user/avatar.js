$(function () {
	// 1.1 获取裁剪区域的 DOM 元素
	var $image = $("#image");
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: ".img-preview",
	};

	// 1.3 创建裁剪区域
	$image.cropper(options);

	$(".uploadImage").click(function () {
		$("#selectFile").click();
	});

	$("#selectFile").change(function (e) {
		const files = e.target.files;
		if (files.length === 0) {
			return layer.msg("请选择一张图片");
		} else {
			// 更换裁剪的图片
			// 1. 拿到用户选择的文件
			const file = e.target.files[0];
			// 2. 根据选择的文件，创建一个对应的 URL 地址：
			const newImgURL = URL.createObjectURL(file);
			// 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
			$image
				.cropper("destroy") // 销毁旧的裁剪区域
				.attr("src", newImgURL) // 重新设置图片路径
				.cropper(options); // 重新初始化裁剪区域
			// 将裁剪后的图片，输出为 base64 格式的字符串
		}
	});
	function Upload() {
		$(".btnUpload").on("click", function () {
			const dataURL = $image
				.cropper("getCroppedCanvas", {
					// 创建一个 Canvas 画布
					width: 100,
					height: 100,
				})
				.toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
			$.ajax({
				type: "POST",
				url: "/my/update/avatar",
				data: {
					avatar: dataURL,
				},
				success: function (response) {
					console.log(response);
					if (response.status != 0) {
						return layer.msg(response.message);
					} else {
						layer.msg(response.message);
						window.parent.getUserinfo();
					}
				},
			});
		});
	}
	Upload();
});
