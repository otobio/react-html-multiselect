"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, props);
    _this.topNode = _react["default"].createRef();
    var value = [];

    if (props.value && props.options) {
      props.options.forEach(function (opt) {
        props.value.forEach(function (opt2) {
          if (opt2.value === opt.value) {
            value.push(opt);
          }
        });
      });
    }

    _this.state = {
      selected: value,
      isOpen: false
    };
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("click", this.handleDocumentClick, false);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(_newProps, newState) {
      if (newState.selected !== this.state.selected && this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.handleDocumentClick, false);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (event.type === "mousedown" && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();
      this.setState(function (pState) {
        return {
          isOpen: !pState.isOpen
        };
      });
    }
  }, {
    key: "setValue",
    value: function setValue(option) {
      var selected = this.state.selected;
      var optionIndex = selected.indexOf(option);
      var newState = {
        selected: optionIndex === -1 ? selected.concat(option) : selected.slice(0, optionIndex).concat(selected.slice(optionIndex + 1))
      };
      this.setState(newState);
    }
  }, {
    key: "renderOption",
    value: function renderOption(option) {
      var optionClass = (0, _classnames["default"])({
        "Dropdown-option": true,
        "is-selected": this.state.selected.indexOf(option) !== -1
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        role: "option",
        key: option.value,
        className: optionClass,
        onClick: this.setValue.bind(this, option),
        onKeyDown: this.setValue.bind(this, option),
        tabIndex: "0"
      }, option.label);
    }
  }, {
    key: "buildMenu",
    value: function buildMenu() {
      var _this2 = this;

      var ops = this.props.options.map(function (option) {
        if (option.type === "group") {
          var groupTitle = /*#__PURE__*/_react["default"].createElement("div", {
            className: "title"
          }, option.name);

          var options = option.items.map(function (item) {
            return _this2.renderOption(item);
          });
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "group",
            key: option.name
          }, groupTitle, options);
        }

        return _this2.renderOption(option);
      });
      return ops.length ? ops : /*#__PURE__*/_react["default"].createElement("div", {
        className: "Dropdown-noresults"
      }, "No options found");
    }
  }, {
    key: "renderHtmlOptions",
    value: function renderHtmlOptions() {
      var selectedValues = this.state.selected.map(function (item) {
        return String(item.value);
      });
      return this.props.options.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: option.value,
          value: option.value,
          selected: selectedValues.indexOf(String(option.value)) > -1
        }, option.label);
      });
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(event) {
      if (!this.topNode.current.contains(event.target)) {
        this.setState({
          isOpen: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          controlClassName = _this$props.controlClassName,
          menuClassName = _this$props.menuClassName,
          placeholder = _this$props.placeholder,
          noPreview = _this$props.noPreview;
      var _this$state = this.state,
          selected = _this$state.selected,
          isOpen = _this$state.isOpen;
      var value = selected.map(function (option) {
        return option.label;
      }).join(", ");
      var menu = isOpen ? /*#__PURE__*/_react["default"].createElement("div", {
        className: menuClassName
      }, this.buildMenu()) : null;
      var dropdownClass = (0, _classnames["default"])({
        Dropdown: true,
        "is-open": isOpen
      }, className);
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.topNode,
        className: dropdownClass
      }, /*#__PURE__*/_react["default"].createElement("select", {
        multiple: true,
        name: this.props.name,
        className: "invisible-element"
      }, this.renderHtmlOptions()), /*#__PURE__*/_react["default"].createElement("div", {
        role: "listbox",
        tabIndex: "0",
        className: controlClassName,
        onMouseDown: this.handleMouseDown.bind(this),
        onTouchEnd: this.handleMouseDown.bind(this)
      }, !noPreview && value || noPreview && selected.length && "".concat(selected.length, " Selected") || placeholder, /*#__PURE__*/_react["default"].createElement("span", {
        className: "Dropdown-arrow"
      })), menu);
    }
  }]);

  return Dropdown;
}(_react["default"].Component);

Dropdown.propTypes = {
  name: _propTypes["default"].string,
  value: _propTypes["default"].array,
  options: _propTypes["default"].array,
  placeholder: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  controlClassName: _propTypes["default"].string,
  menuClassName: _propTypes["default"].string,
  className: _propTypes["default"].string,
  noPreview: _propTypes["default"].bool
};
Dropdown.defaultProps = {
  controlClassName: "Dropdown-control",
  menuClassName: "Dropdown-menu",
  onChange: function onChange() {},
  placeholder: "Select"
};
var _default = Dropdown;
exports["default"] = _default;
