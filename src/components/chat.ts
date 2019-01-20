import debounce from 'debounce'

type ChatId = {
  encodedChatId: string,
}

class Chat {
  id: string
  window: Window

  static debounce = 300

  constructor (id: string, window: Window) {
    this.id = id
    this.window = window

    this.mount()
  }

  load = () => {
    const { id, window } = this
    const chats = { encodedChatId: id }

    const params = {
      embedChatsParameters: chats instanceof Array ? chats : [chats],
      lang: navigator.language,
      needLoadCode: 'undefined' === typeof (window as any).Chatbro,
      embedParamsVersion: localStorage.embedParamsVersion,
      chatbroScriptVersion: localStorage.chatbroScriptVersion,
    }

    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    // tslint:disable-next-line:no-eval
    xhr.onload = () => eval(xhr.responseText)
    xhr.onerror = () => console.error('Chatbro loading error')
    const query = btoa(unescape(encodeURIComponent(JSON.stringify(params))))
    xhr.open('GET', `//www.chatbro.com/embed.js?${query}`, false)
    xhr.send()
  }

  handleResize = debounce(this.load, Chat.debounce)

  mount = () => {
    this.load()
    this.window.addEventListener('resize', this.handleResize)
  }
}

export default Chat
