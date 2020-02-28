import px2rem from "p-to-r";

const styleEl = document.createElement("style");
styleEl.innerHTML = `._____loading_mask_______{position:fixed;z-index:999;width:100%;height:100%;top:0;left:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}@-webkit-keyframes __spinner_{0%{opacity:1}100%{opacity:0}}@keyframes __spinner_{0%{opacity:1}100%{opacity:0}}.__spinner_{position:relative}.__spinner_ div{left:.44em;top:0;position:absolute;-webkit-animation:__spinner_ linear .6s infinite;animation:__spinner_ linear .6s infinite;width:.1em;height:.3em;border-radius:30%;-webkit-transform-origin:.05em .5em;-ms-transform-origin:.05em .5em;transform-origin:.05em .5em}.__spinner_ div:nth-child(1){-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-.55s;animation-delay:-.55s}.__spinner_ div:nth-child(2){-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.__spinner_ div:nth-child(3){-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg);-webkit-animation-delay:-.45s;animation-delay:-.45s}.__spinner_ div:nth-child(4){-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-.4s;animation-delay:-.4s}.__spinner_ div:nth-child(5){-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg);-webkit-animation-delay:-.35s;animation-delay:-.35s}.__spinner_ div:nth-child(6){-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg);-webkit-animation-delay:-.3s;animation-delay:-.3s}.__spinner_ div:nth-child(7){-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.__spinner_ div:nth-child(8){-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg);-webkit-animation-delay:-.2s;animation-delay:-.2s}.__spinner_ div:nth-child(9){-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg);-webkit-animation-delay:-.15s;animation-delay:-.15s}.__spinner_ div:nth-child(10){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-.1s;animation-delay:-.1s}.__spinner_ div:nth-child(11){-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg);-webkit-animation-delay:-50ms;animation-delay:-50ms}.__spinner_ div:nth-child(12){-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg);-webkit-animation-delay:0s;animation-delay:0s}`;
document.head.appendChild(styleEl);

const showIndicator = ({
  mask,
  size,
  color,
  text,
  type,
  textSize,
  textColor
}) => {
  let indicatorElement = document.getElementById(
    `___wj_l-o-a-d-i-n-g____${type}`
  );
  if (!indicatorElement) {
    indicatorElement = document.createElement("div");
    indicatorElement.id = `___wj_l-o-a-d-i-n-g____${type}`;
    indicatorElement.ontouchmove = e => e.cancelable && e.preventDefault();
    indicatorElement.className = "_____loading_mask_______";
    indicatorElement.style.backgroundColor = `rgba(0,0,0, ${mask})`;
    if (type === "loading") {
      const _size = px2rem(size);
      indicatorElement.innerHTML = `
          <div
            class="__spinner_"
            style="width: ${_size};height: ${_size};font-size: ${_size}"
          >
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
            <div style="background: ${color}"></div>
          </div>
        `;
    } else if (type === "toast") {
      const span = document.createElement("span");
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
    const span = indicatorElement.children[0];
    span.innerHTML = text;
    span.style.fontSize = px2rem(textSize);
    span.style.color = px2rem(textColor);
  }
};
const hideIndicator = type => {
  const indicatorElement = document.getElementById(
    `___wj_l-o-a-d-i-n-g____${type}`
  );
  if (indicatorElement) {
    indicatorElement.parentNode.removeChild(indicatorElement);
  }
};

class Indicator {
  loadingCount = 0;
  toastCount = 0;
  showLoading = config => {
    const mergeConfig = Object.assign(
      {
        timeout: 20000,
        color: "#919191",
        mask: 0.1,
        size: 45,
        type: "loading"
      },
      config
    );
    this.loadingCount++;
    showIndicator(mergeConfig);
    return setTimeout(this.hideLoading, mergeConfig.timeout);
  };
  hideLoading = loadingId => {
    clearTimeout(loadingId);
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      hideIndicator("loading");
      this.loadingCount = 0;
    }
  };
  toast = (text = "", config) => {
    let showText = text;
    if (typeof text === "object") {
      showText = text.message || JSON.stringify(text);
    }
    const mergeConfig = Object.assign(
      {
        timeout: 1500,
        textColor: "#fff",
        textSize: 26,
        type: "toast",
        mask: 0,
        text: showText
      },
      config
    );
    this.toastCount++;
    setTimeout(this.hideToast, mergeConfig.timeout);
    showIndicator(mergeConfig);
  };
  hideToast = () => {
    this.toastCount--;
    if (this.toastCount <= 0) {
      hideIndicator("toast");
      this.toastCount = 0;
    }
  };
}

export default new Indicator();
