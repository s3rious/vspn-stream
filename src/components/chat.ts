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

  load = (): Promise<void> => new Promise((resolve) => {
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

    xhr.onload = () => {
      // tslint:disable-next-line:no-eval
      eval(xhr.responseText)
      resolve()
    }
    xhr.onerror = () => console.error('Chatbro loading error')
    const query = btoa(unescape(encodeURIComponent(JSON.stringify(params))))
    xhr.open('GET', `//www.chatbro.com/embed.js?${query}`, false)
    xhr.send()
  })

  handleResize = debounce(this.load, Chat.debounce)

  mount = async () => {
    this.load()

    // TODO: this is a BODGE, around some weied stuff, delete it
    let root = document.getElementById('#chatbro')
    if (!root) {
      root = document.body
    }
    const target = root.querySelector('#chatbro .chatbro_messages_empty')

    if (!target) {
      return
    }

    const observer = new MutationObserver(function(mutations) {
      // check for removed target
      mutations.forEach(function(mutation) {
        console.log(observer)
        setTimeout(() => {
          const elm = document.querySelector('.chatbro_messages_wrapper')
          const messages = document.querySelectorAll('.chatbro_message')
          if (messages && messages.length > 1 && elm) {
            elm.scroll(0, 999999999999999999999999)
            observer.disconnect()
          }
        }, 100)
      })
    })

    observer.observe(root, { subtree: true, childList: true })
  }
}

export default Chat
