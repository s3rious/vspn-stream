import '@babel/polyfill'
import './css/index.css'

import Video from './components/video'
import Counter from './components/counter'

const video = new Video(document.getElementById('video'), document.body)
const counter = new Counter(document.querySelector('[data-count]'))
