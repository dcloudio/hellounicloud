(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/clientDB/permission-table-compound/permission-table-compound"],{

/***/ 55:
/*!***********************************************************************************************************************************!*\
  !*** D:/unicloud-jest/hello-uniCloud/main.js?{"page":"pages%2FclientDB%2Fpermission-table-compound%2Fpermission-table-compound"} ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _permissionTableCompound = _interopRequireDefault(__webpack_require__(/*! ./pages/clientDB/permission-table-compound/permission-table-compound.vue */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_permissionTableCompound.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 56:
/*!**************************************************************************************************************!*\
  !*** D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permission-table-compound.vue?vue&type=template&id=4f714498&scoped=true& */ 57);
/* harmony import */ var _permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./permission-table-compound.vue?vue&type=script&lang=js& */ 59);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permission-table-compound.vue?vue&type=style&index=0&id=4f714498&scoped=true&lang=css& */ 61);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4f714498",
  null,
  false,
  _permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/clientDB/permission-table-compound/permission-table-compound.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 57:
/*!*********************************************************************************************************************************************************!*\
  !*** D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=template&id=4f714498&scoped=true& ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./permission-table-compound.vue?vue&type=template&id=4f714498&scoped=true& */ 58);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_template_id_4f714498_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 58:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=template&id=4f714498&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniSegmentedControl: function() {
      return __webpack_require__.e(/*! import() | components/uni-segmented-control/uni-segmented-control */ "components/uni-segmented-control/uni-segmented-control").then(__webpack_require__.bind(null, /*! @/components/uni-segmented-control/uni-segmented-control.vue */ 315))
    },
    alertCode: function() {
      return __webpack_require__.e(/*! import() | components/alertCode/alertCode */ "components/alertCode/alertCode").then(__webpack_require__.bind(null, /*! @/components/alertCode/alertCode.vue */ 322))
    },
    showCode: function() {
      return __webpack_require__.e(/*! import() | components/show-code/show-code */ "components/show-code/show-code").then(__webpack_require__.bind(null, /*! @/components/show-code/show-code.vue */ 214))
    },
    setPermission: function() {
      return __webpack_require__.e(/*! import() | components/set-permission/set-permission */ "components/set-permission/set-permission").then(__webpack_require__.bind(null, /*! @/components/set-permission/set-permission.vue */ 272))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.types.map(function(ref) {
    var text = ref.text

    return text
  })

  var l0 = _vm.__map(_vm.permissionList, function(item, index) {
    var $orig = _vm.__get_orig(item)

    var g1 =
      item.exclude !== _vm.type && index === 0 && _vm.type != "create"
        ? Date.now()
        : null
    return {
      $orig: $orig,
      g1: g1
    }
  })

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.typeIndex = $event.currentIndex
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 59:
/*!***************************************************************************************************************************************!*\
  !*** D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./permission-table-compound.vue?vue&type=script&lang=js& */ 60);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 60:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var db = uniCloud.database();var uniPopup = function uniPopup() {Promise.all(/*! require.ensure | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup.vue */ 249));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopupMessage = function uniPopupMessage() {__webpack_require__.e(/*! require.ensure | components/uni-popup/uni-popup-message */ "components/uni-popup/uni-popup-message").then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup-message.vue */ 279));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopupDialog = function uniPopupDialog() {__webpack_require__.e(/*! require.ensure | components/uni-popup/uni-popup-dialog */ "components/uni-popup/uni-popup-dialog").then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup-dialog.vue */ 286));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniNoticeBar = function uniNoticeBar() {__webpack_require__.e(/*! require.ensure | components/uni-notice-bar/uni-notice-bar */ "components/uni-notice-bar/uni-notice-bar").then((function () {return resolve(__webpack_require__(/*! @/components/uni-notice-bar/uni-notice-bar.vue */ 293));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var alertCode = function alertCode() {__webpack_require__.e(/*! require.ensure | components/alertCode/alertCode */ "components/alertCode/alertCode").then((function () {return resolve(__webpack_require__(/*! @/components/alertCode/alertCode.vue */ 322));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =





{
  components: {
    uniPopup: uniPopup,
    uniPopupMessage: uniPopupMessage,
    uniPopupDialog: uniPopupDialog,
    uniNoticeBar: uniNoticeBar,
    alertCode: alertCode },

  computed: {
    type: function type() {
      return this.types[this.typeIndex].value;
    },
    typeText: function typeText() {
      return this.types[this.typeIndex].text;
    } },

  created: function created() {
    for (var j = 0; j < this.types.length; j++) {
      var type = this.types[j].value;
      console.log(type);
      for (var i = 0; i < this.permissionList.length; i++) {
        var jsonString = "{\n\t\t\t\t\t\t\"permission\":{\n\t\t\t\t\t\t\t\"".concat(

        type, "\":\"").concat(this.permissionList[i].code, "\"\n\t\t\t\t\t\t}\n\t\t\t\t}");


        if (!this.permissionList[i].codes) this.permissionList[i].codes = {};
        this.permissionList[i].codes[type] = JSON.parse(jsonString);
      }
    }
    console.log(this.permissionList);
  },
  data: function data() {
    return {
      types: [
      {
        text: "创建",
        value: "create" },

      {
        text: "读取",
        value: "read" },

      {
        text: "更新",
        value: "update" },

      {
        text: "删除",
        value: "delete" }],


      typeIndex: 0,
      permissionList: [
      {
        "msg": "交集表达式",
        "code": "doc.create_time > (now - 60000) && 'AUDITOR' in auth.role",
        "explain": "限1分钟内的数据，“且”角色必须为审核员",
        "exclude": "create" },

      {
        "msg": "并集表达式",
        "code": "auth.uid != null || 'add_view_count' in action",
        "explain": "限非未登陆的游客，“或”带action",
        "tableName": "permission-test-9" }] };



  },
  mounted: function mounted() {
    uni.setStorageSync('uni_id_token', '');
    uni.setStorageSync('uni_id_token_expired', '');
  },
  methods: {
    myFn: function myFn(e) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var item, tableName, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0: // {type:'',tableName:'',index,action:'',where:{}}
                console.log('myFun' + JSON.stringify(e));
                e.where = e.where || {};
                item = _this.permissionList[e.index];
                tableName = item.tableName || 'permission-test-' + (e.index + 8);
                uni.showLoading({
                  mask: true });


                console.log(
                '表名称：' + tableName +
                '\n 条件：' + JSON.stringify(e.where));_context.prev = 6;_context.t0 =




                e.type;_context.next = _context.t0 ===
                'read' ? 10 : _context.t0 ===









                'create' ? 17 : _context.t0 ===




                'update' ? 21 : _context.t0 ===




                'delete' ? 25 : 29;break;case 10:_context.next = 12;return db.action(e.action).collection(tableName).where(e.where).get();case 12:res = _context.sent;if (!(res.result.data.length == 0)) {_context.next = 16;break;}uni.showModal({ title: "数据为空，请先点击创建数据", showCancel: false });return _context.abrupt("return", false);case 16:return _context.abrupt("break", 31);case 17:_context.next = 19;return db.action(e.action).collection(tableName).add({ "text": "默认写入的数据" + Date.now() });case 19:res = _context.sent;return _context.abrupt("break", 31);case 21:_context.next = 23;return db.action(e.action).collection(tableName).where(e.where).update({ "text": "更新后的数据" + Date.now() });case 23:res = _context.sent;return _context.abrupt("break", 31);case 25:_context.next = 27;return (
                  db.action(e.action).collection(tableName).where(e.where).remove());case 27:res = _context.sent;return _context.abrupt("break", 31);case 29:


                console.log('err 未定义事件类型');return _context.abrupt("break", 31);case 31:_context.next = 38;break;case 33:_context.prev = 33;_context.t1 = _context["catch"](6);



                console.log('TODO handle the exception', _context.t1);
                uni.showModal({
                  title: '错误:' + _context.t1.message + ',' + _context.t1.code,
                  content: item.explain + '【' + _this.typeText + '数据】' + (item.explain_end ? item.explain_end : ''),
                  showCancel: false });return _context.abrupt("return",

                false);case 38:_context.prev = 38;

                uni.hideLoading();return _context.finish(38);case 41:

                /* uni.showModal({
                                                                      	title: this.typeText+'数据成功',
                                                                      	content: JSON.stringify(res.result),
                                                                      	showCancel: false
                                                                      }); */
                _this.$refs.alertCode.open(res.result);case 42:case "end":return _context.stop();}}}, _callee, null, [[6, 33, 38, 41]]);}))();

    },
    /* myFn_action(tableName) {
       	db.action('add_view_count').collection(tableName).get().then((e) => {
       		uni.showModal({
       			title: "执行读取成功",
       			content: JSON.stringify(e.result.data),
       			showCancel: false
       		});
       	}).catch((err) => {
       		console.log(err);
       		uni.showModal({
       			content: err.message + " | code:" + err.code,
       			showCancel: false
       		});
       	})
       }, */
    changePermission: function changePermission(role) {
      console.log(role);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 17)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 61:
/*!***********************************************************************************************************************************************************************!*\
  !*** D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=style&index=0&id=4f714498&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HX/alpha-3.1.3/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./permission-table-compound.vue?vue&type=style&index=0&id=4f714498&scoped=true&lang=css& */ 62);
/* harmony import */ var _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HX_alpha_3_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_permission_table_compound_vue_vue_type_style_index_0_id_4f714498_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 62:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/unicloud-jest/hello-uniCloud/pages/clientDB/permission-table-compound/permission-table-compound.vue?vue&type=style&index=0&id=4f714498&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[55,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/clientDB/permission-table-compound/permission-table-compound.js.map