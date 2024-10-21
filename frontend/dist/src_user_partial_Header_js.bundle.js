"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["src_user_partial_Header_js"],{

/***/ "./src/user/partial/Header.js":
/*!************************************!*\
  !*** ./src/user/partial/Header.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _utils_mutators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/mutators */ "./src/utils/mutators.js");
// ./partial/Header.js


 // Import the removeToken function

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
const Header = _ref => {
  let {
    links
  } = _ref;
  const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Fetch the user data on component mount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const currentUser = (0,_utils_mutators__WEBPACK_IMPORTED_MODULE_1__.getUser)(); // Retrieve the user from localStorage
    if (currentUser) {
      setUser(currentUser); // Set the user data in the state
    }
  }, []);

  // If user data is not yet available, show loading or placeholder
  if (!user) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading user info..."));
  }
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)(); // Initialize useNavigate hook

  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  console.log('HEADER LOCATION: ', location);
  const handleCheck = () => {
    // Your logic here
    console.log("Check button clicked!");
    // You can also call the getToken function here, for example:
    const token = (0,_utils_mutators__WEBPACK_IMPORTED_MODULE_1__.getToken)();
    console.log('Retrieved Token:', token);
  };

  // Function to handle logout
  const handleLogout = () => {
    (0,_utils_mutators__WEBPACK_IMPORTED_MODULE_1__.removeToken)(); // Remove the token
    navigate('/login/'); // Redirect to login page
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", {
    className: "header_user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Welcome, ", user.username, "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, user.email)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "navigation_user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, links.map((link, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: index
  }, link.text === "Logout" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleLogout,
    style: {
      background: 'none',
      border: 'none',
      color: '#61dafb',
      cursor: 'pointer'
    }
  }, link.text) : link.text === "Check" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleCheck,
    style: {
      background: 'none',
      border: 'none',
      color: '#61dafb',
      cursor: 'pointer'
    }
  }, link.text) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: link.url
  }, link.text))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ })

}]);
//# sourceMappingURL=src_user_partial_Header_js.bundle.js.map