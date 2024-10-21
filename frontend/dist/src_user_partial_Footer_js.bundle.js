"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["src_user_partial_Footer_js"],{

/***/ "./src/user/partial/Footer.js":
/*!************************************!*\
  !*** ./src/user/partial/Footer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
// ./partial/Header.js


const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const h1Style = {
  margin: 0,
  fontSize: '1.8em',
  fontWeight: 'bold'
};
const navStyle = {
  marginLeft: '20px'
};
const ulStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex'
};
const liStyle = {
  marginLeft: '20px'
};
const linkStyle = {
  color: '#61dafb',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'color 0.3s'
};
const linkHoverStyle = {
  color: '#21a1f1',
  textDecoration: 'underline'
};
const Footer = _ref => {
  let {
    links
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
    className: "footer_user"
  }, "DDFDFDFDGGGG", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "navigation_foot_user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, links.map((link, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: index
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: link.url
  }, link.text))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "\xA9 ", new Date().getFullYear(), " Your Company. All Rights Reserved."));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ })

}]);
//# sourceMappingURL=src_user_partial_Footer_js.bundle.js.map