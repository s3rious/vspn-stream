class Counter {

  constructor(options) {
    const { url, node } = options
    this.socket = io(url)
    this.node = node

    this.mount = this.mount.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)

    this.mount()
  }

  mount() {
    this.socket.on('count', this.handleCountChange)
  }

  handleCountChange({ count }) {
    this.node.innerText = count
  }
}


Array.prototype.forEach.call(
  document.querySelectorAll('[data-count]'),
  function (node) {
    const { count: url } = node.dataset
    node.component = new Counter({ node, url })
  }
)
