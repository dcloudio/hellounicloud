<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		mounted() {
			// #ifdef H5
			//const VConsole = require('@/common/js/vconsole.min.js')
			//new VConsole()
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	view{
		box-sizing: border-box;
	}
	@font-face {
	    font-family: "iconfont";
	    src: url('https://at.alicdn.com/t/font_2354462_s00xh8caffp.ttf');
	}
	.ico{
		font-family: iconfont;
	}
	/* #endif */
</style>
