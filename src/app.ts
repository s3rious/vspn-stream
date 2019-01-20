import '@babel/polyfill'
import './css/index.css'

import Video from './components/video'

const videoNode = document.getElementById('video')
const video = new Video(videoNode, document.body)
