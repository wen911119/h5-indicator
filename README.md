### Example

```javascript
import indicator from "h5-indicator";
// toast
// indicator.toast('some tost', [config])
indicator.toast("toast", {
  // default config
  timeout: 1500,
  textColor: "#fff",
  textSize: 26
});
// loaidng
// indicator.showLoading([config])
indicator.showLoading({
  timeout: 20000,
  color: "#919191",
  mask: 0.1,
  size: 45
});
indicator.hideLoading();
```
