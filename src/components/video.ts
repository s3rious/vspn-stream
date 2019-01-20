import Hls from 'hls.js'

class Video {
  video: HTMLVideoElement
  source: string
  body: HTMLElement
  hls: Hls

  static config = {
    autoStartLoad: true,
    startPosition : -1,
    capLevelToPlayerSize: false,
    debug: false,
    defaultAudioCodec: undefined,
    initialLiveManifestSize: 1,
    maxBufferLength: 30,
    maxMaxBufferLength: 600,
    maxBufferSize: 60 * 1000 * 1000,
    maxBufferHole: 0.5,
    lowBufferWatchdogPeriod: 0.5,
    highBufferWatchdogPeriod: 3,
    nudgeOffset: 0.1,
    nudgeMaxRetry : 3,
    maxFragLookUpTolerance: 0.2,
    liveSyncDurationCount: 3,
    liveMaxLatencyDurationCount: 10,
    enableWorker: true,
    enableSoftwareAES: true,
    manifestLoadingTimeOut: 10000,
    manifestLoadingMaxRetry: 1,
    manifestLoadingRetryDelay: 500,
    manifestLoadingMaxRetryTimeout : 64000,
    startLevel: undefined,
    levelLoadingTimeOut: 10000,
    levelLoadingMaxRetry: 4,
    levelLoadingRetryDelay: 500,
    levelLoadingMaxRetryTimeout: 64000,
    fragLoadingTimeOut: 20000,
    fragLoadingMaxRetry: 6,
    fragLoadingRetryDelay: 500,
    fragLoadingMaxRetryTimeout: 64000,
    startFragPrefetch: false,
    appendErrorMaxRetry: 3,
    enableWebVTT: true,
    enableCEA708Captions: true,
    stretchShortVideoTrack: false,
    maxAudioFramesDrift : 1,
    forceKeyFrameOnDiscontinuity: true,
    abrEwmaFastLive: 5.0,
    abrEwmaSlowLive: 9.0,
    abrEwmaFastVoD: 4.0,
    abrEwmaSlowVoD: 15.0,
    abrEwmaDefaultEstimate: 500000,
    abrBandWidthFactor: 0.95,
    abrBandWidthUpFactor: 0.7,
    minAutoBitrate: 0,
  }

  static interval = 5000

  constructor (video: HTMLElement | null, body: HTMLElement | null) {
    if (!video) {
      throw new Error('Video node was not passed.')
    }
    if (!(video instanceof HTMLVideoElement)) {
      throw new Error('Video node is not instance of HTMLVideoElement.')
    }
    if (!body) {
      throw new Error('Body node was not passed')
    }

    const { source } = video.dataset

    if (!source) {
      throw new Error('Source is missing at video node dataset')
    }

    this.video = video
    this.source = source
    this.body = body
    this.hls = new Hls(Video.config)

    this.mount()
    video.addEventListener('play', this.handlePlay)
    video.addEventListener('pause', this.handlePause)
  }

  handlePlay = (): void => {
    this.body.classList.add('playing')
  }

  handlePause = (): void => {
    this.body.classList.remove('playing')
  }

  handleAttach = (): Promise<void> => new Promise((resolve) => {
    const { hls, video } = this

    hls.attachMedia(video)
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('video and hls.js are now bound together !')
      resolve()
    })
  })

  handleLoad = (): Promise<void> => new Promise((resolve) => {
    const { hls, source } = this
    const interval = (
      setInterval(() => {
        hls.loadSource(source)
      }, Video.interval)
    )

    hls.loadSource(source)
    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      clearInterval(interval)
      console.log('manifest loaded, found ' + data.levels.length + ' quality level')
      resolve()
    })
  })

  mount = async () => {
    const { video } = this

    if (Hls.isSupported()) {
      await this.handleAttach()
      await this.handleLoad()
      video.play()
    }
  }
}

export default Video
