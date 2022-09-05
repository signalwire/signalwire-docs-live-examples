import './styles.css';
import { DEMO_TOKEN } from './constants';
import * as SignalWire from '@signalwire/js'

const btnJoin = document.getElementById('btnJoin')
const btnLeave = document.getElementById('btnLeave')
const inCallControls = document.getElementById('inCallControls')
const btnRewind = document.getElementById('btnRewind')
const btnBack = document.getElementById('btnBack')
const btnPause = document.getElementById('btnPause')
const btnPlay = document.getElementById('btnPlay')
const btnForward = document.getElementById('btnForward')
const btnStop = document.getElementById('btnStop')

let roomSession;
let playback;

/**
 * Joins the room.
 */
async function onJoinClicked() {
  // Configure the room session
  roomSession = new SignalWire.Video.RoomSession({
    token: DEMO_TOKEN,
    rootElement: document.getElementById("myVideoElement"),
  });

  btnJoin.style.display = 'none'

  // After everything is set up, join the room.
  await roomSession.join();

  inCallControls.style.display = 'block'
}

/**
 * Leaves the room.
 */
async function onLeaveClicked() {
  await roomSession?.leave()
  playback = null
  btnJoin.style.display = 'block'
  inCallControls.style.display = 'none'
}

btnPlay.addEventListener('click', async () => {
  if (!playback) {
    playback = await roomSession.play({ url: document.getElementById('playbackUrl').value })
  } else {
    playback.resume()
  }
})

btnRewind.addEventListener('click', async () => {
  playback?.seek(0)
})

btnBack.addEventListener('click', async () => {
  playback?.rewind(10000)
})

btnForward.addEventListener('click', async () => {
  playback?.forward(10000)
})

btnPause.addEventListener('click', async () => {
  playback?.pause()
})

btnStop.addEventListener('click', async () => {
  // Stop all running playbacks
  const { playbacks } = await roomSession.getPlaybacks();
  playbacks.forEach(p => p.stop())
  playback = null
})

btnJoin.addEventListener('click', onJoinClicked)
btnLeave.addEventListener('click', onLeaveClicked)