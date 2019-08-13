import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.object.assign";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import px2rem from "p-to-r";
var styleEl = document.createElement("style");
styleEl.innerHTML = "._____loading_mask_______{position:fixed;z-index:999;width:100%;height:100%;top:0;left:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}@-webkit-keyframes __spinner_{0%{opacity:1}100%{opacity:0}}@keyframes __spinner_{0%{opacity:1}100%{opacity:0}}.__spinner_{position:relative}.__spinner_ div{left:.44em;top:0;position:absolute;-webkit-animation:__spinner_ linear .6s infinite;animation:__spinner_ linear .6s infinite;width:.1em;height:.3em;border-radius:30%;-webkit-transform-origin:.05em .5em;-ms-transform-origin:.05em .5em;transform-origin:.05em .5em}.__spinner_ div:nth-child(1){-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-.55s;animation-delay:-.55s}.__spinner_ div:nth-child(2){-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.__spinner_ div:nth-child(3){-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg);-webkit-animation-delay:-.45s;animation-delay:-.45s}.__spinner_ div:nth-child(4){-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-.4s;animation-delay:-.4s}.__spinner_ div:nth-child(5){-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg);-webkit-animation-delay:-.35s;animation-delay:-.35s}.__spinner_ div:nth-child(6){-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg);-webkit-animation-delay:-.3s;animation-delay:-.3s}.__spinner_ div:nth-child(7){-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.__spinner_ div:nth-child(8){-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg);-webkit-animation-delay:-.2s;animation-delay:-.2s}.__spinner_ div:nth-child(9){-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg);-webkit-animation-delay:-.15s;animation-delay:-.15s}.__spinner_ div:nth-child(10){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-.1s;animation-delay:-.1s}.__spinner_ div:nth-child(11){-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg);-webkit-animation-delay:-50ms;animation-delay:-50ms}.__spinner_ div:nth-child(12){-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg);-webkit-animation-delay:0s;animation-delay:0s}";
document.head.appendChild(styleEl);

var showIndicator = function showIndicator(_ref) {
  var mask = _ref.mask,
      size = _ref.size,
      color = _ref.color,
      text = _ref.text,
      type = _ref.type,
      textSize = _ref.textSize,
      textColor = _ref.textColor;
  var indicatorElement = document.getElementById("___wj_l-o-a-d-i-n-g____".concat(type));

  if (!indicatorElement) {
    indicatorElement = document.createElement("div");
    indicatorElement.id = "___wj_l-o-a-d-i-n-g____".concat(type);
    indicatorElement.className = "_____loading_mask_______";
    indicatorElement.style.backgroundColor = "rgba(0,0,0, ".concat(mask, ")");

    if (type === "loading") {
      var _size = px2rem(size);

      indicatorElement.innerHTML = "\n          <div\n            class=\"__spinner_\"\n            style=\"width: ".concat(_size, ";height: ").concat(_size, ";font-size: ").concat(_size, "\"\n          >\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n            <div style=\"background: ").concat(color, "\"></div>\n          </div>\n        ");
    } else if (type === "toast") {
      var span = document.createElement("span");
      Object.assign(span.style, {
        padding: "6px 10px",
        backgroundColor: "rgba(0,0,0,.5)",
        borderRadius: "2px"
      });
      indicatorElement.appendChild(span);
    }

    document.body.appendChild(indicatorElement);
  }

  if (type === "toast") {
    var _span = indicatorElement.children[0];
    _span.innerHTML = text;
    _span.style.fontSize = px2rem(textSize);
    _span.style.color = px2rem(textColor);
  }
};

var hideIndicator = function hideIndicator(type) {
  var indicatorElement = document.getElementById("___wj_l-o-a-d-i-n-g____".concat(type));

  if (indicatorElement) {
    indicatorElement.parentNode.removeChild(indicatorElement);
  }
};

var Indicator = function Indicator() {
  var _this = this;

  _classCallCheck(this, Indicator);

  this.loadingCount = 0;
  this.toastCount = 0;

  this.showLoading = function (config) {
    var mergeConfig = Object.assign({
      timeout: 20000,
      color: "#919191",
      mask: 0.1,
      size: 45,
      type: "loading"
    }, config);
    _this.loadingCount++;
    setTimeout(_this.hideLoading, mergeConfig.timeout);
    showIndicator(mergeConfig);
  };

  this.hideLoading = function () {
    _this.loadingCount--;

    if (_this.loadingCount <= 0) {
      hideIndicator("loading");
      _this.loadingCount = 0;
    }
  };

  this.toast = function () {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var config = arguments.length > 1 ? arguments[1] : undefined;
    var showText = text;

    if (_typeof(text) === "object") {
      showText = text.message || JSON.stringify(text);
    }

    var mergeConfig = Object.assign({
      timeout: 1500,
      textColor: "#fff",
      textSize: 26,
      type: "toast",
      mask: 0,
      text: showText
    }, config);
    _this.toastCount++;
    setTimeout(_this.hideToast, mergeConfig.timeout);
    showIndicator(mergeConfig);
  };

  this.hideToast = function () {
    _this.toastCount--;

    if (_this.toastCount <= 0) {
      hideIndicator("toast");
      _this.toastCount = 0;
    }
  };
};

export default new Indicator();