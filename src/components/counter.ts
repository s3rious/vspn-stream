import io from 'socket.io-client'

class Counter {
  node: HTMLElement
  socket: SocketIOClient.Socket

  constructor (node: HTMLElement | null) {
    if (!node) {
      throw new Error('Counter node wa2s not passed.')
    }

    const { count: url } = node.dataset

    if (!url) {
      throw new Error('Url is missing at counter node dataset')
    }

    this.socket = io(url)
    this.node = node

    this.mount = this.mount.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)

    this.mount()
  }

  mount = () => {
    this.socket.on('count', ({ count }) => this.handleCountChange(count))
  }

  handleCountChange = (count: string | number): void => {
    this.node.innerText = `${count}`
  }
}

export default Counter
