import px2rem from 'p-to-r'

const styleEl = document.createElement('style')
styleEl.innerHTML = `._____loading_mask_______{position:fixed;z-index:999;width:100%;height:100%;top:0;left:0;display:flex;align-items:center;justify-content:center;}@keyframes __spinner_{0%{opacity:1}100%{opacity:0}}.__spinner_{position:relative}.__spinner_ div{left:0.44em;top:0;position:absolute;animation:__spinner_ linear .6s infinite;width:0.1em;height:0.3em;border-radius:30%;transform-origin:.05em .5em}.__spinner_ div:nth-child(1){transform:rotate(0deg);animation-delay:-0.55s}.__spinner_ div:nth-child(2){transform:rotate(30deg);animation-delay:-0.5s}.__spinner_ div:nth-child(3){transform:rotate(60deg);animation-delay:-0.45s}.__spinner_ div:nth-child(4){transform:rotate(90deg);animation-delay:-0.4s}.__spinner_ div:nth-child(5){transform:rotate(120deg);animation-delay:-0.35s}.__spinner_ div:nth-child(6){transform:rotate(150deg);animation-delay:-0.3s}.__spinner_ div:nth-child(7){transform:rotate(180deg);animation-delay:-0.25s}.__spinner_ div:nth-child(8){transform:rotate(210deg);animation-delay:-0.2s}.__spinner_ div:nth-child(9){transform:rotate(240deg);animation-delay:-0.15s}.__spinner_ div:nth-child(10){transform:rotate(270deg);animation-delay:-0.1s}.__spinner_ div:nth-child(11){transform:rotate(300deg);animation-delay:-0.05s}.__spinner_ div:nth-child(12){transform:rotate(330deg);animation-delay:0s}`
document.head.appendChild(styleEl)

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
  )
  if (!indicatorElement) {
    indicatorElement = document.createElement('div')
    indicatorElement.id = `___wj_l-o-a-d-i-n-g____${type}`
    indicatorElement.className = '_____loading_mask_______'
    indicatorElement.style.backgroundColor = `rgba(0,0,0, ${mask})`
    if (type === 'loading') {
      const _size = px2rem(size)
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
        `
    } else if (type === 'toast') {
      const span = document.createElement('span')
      Object.assign(span.style, {
        padding: '6px 10px',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: '2px'
      })
      indicatorElement.appendChild(span)
    }
    document.body.appendChild(indicatorElement)
  }
  if (type === 'toast') {
    const span = indicatorElement.children[0]
    span.innerHTML = text
    span.style.fontSize = px2rem(textSize)
    span.style.color = px2rem(textColor)
  }
}
const hideIndicator = type => {
  const indicatorElement = document.getElementById(
    `___wj_l-o-a-d-i-n-g____${type}`
  )
  if (indicatorElement) {
    indicatorElement.parentNode.removeChild(indicatorElement)
  }
}

class Indicator {
  loadingCount = 0
  toastCount = 0
  showLoading = config => {
    const mergeConfig = Object.assign(
      {
        timeout: 20000,
        color: '#919191',
        mask: 0.1,
        size: 45,
        type: 'loading'
      },
      config
    )
    this.loadingCount++
    setTimeout(this.hideLoading, mergeConfig.timeout)
    showIndicator(mergeConfig)
  }
  hideLoading = () => {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      hideIndicator('loading')
      this.loadingCount = 0
    }
  }
  toast = (text = '', config) => {
    const mergeConfig = Object.assign(
      {
        timeout: 1500,
        textColor: '#fff',
        textSize: 26,
        type: 'toast',
        mask: 0,
        text
      },
      config
    )
    this.toastCount++
    setTimeout(this.hideToast, mergeConfig.timeout)
    showIndicator(mergeConfig)
  }
  hideToast = () => {
    this.toastCount--
    if (this.toastCount <= 0) {
      hideIndicator('toast')
      this.toastCount = 0
    }
  }
}

export default new Indicator()
