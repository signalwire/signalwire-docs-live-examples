import './styles.css';
import { DEMO_TOKEN } from './constants';
import * as SignalWire from '@signalwire/js'

const btnJoin = document.getElementById('btnJoin')
const btnLeave = document.getElementById('btnLeave')
const inCallControls = document.getElementById('inCallControls')
const btnRecord = document.getElementById('btnRecord')
const btnPause = document.getElementById('btnPause')
const btnStop = document.getElementById('btnStop')
const currentStatus = document.getElementById('currentStatus')
const logs = document.getElementById('logs')

let roomSession;
let recording;

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

  // Set up event listeners
  roomSession.on('recording.started', () => currentStatus.innerText = '⏺')
  roomSession.on('recording.updated', (r) => currentStatus.innerText = r.state === 'paused'
    ? '⏸'
    : r.state === 'recording' ? '⏺' : '⏹')
  roomSession.on('recording.ended', (recording) => {
    currentStatus.innerText = '⏹'
    
    logs.innerText = `Recording with id ${recording.id} with a duration of ${recording.duration}s is now accessible from the REST APIs.` + `\n` + logs.innerText
  })

  // After everything is set up, join the room.
  await roomSession.join();

  inCallControls.style.display = 'block'
}

/**
 * Leaves the room.
 */
async function onLeaveClicked() {
  await roomSession?.leave()
  recording = null
  btnJoin.style.display = 'block'
  inCallControls.style.display = 'none'
}

btnRecord.addEventListener('click', async () => {
  if (!recording) {
    recording = await roomSession.startRecording()
  } else {
    recording.resume()
  }
})

btnPause.addEventListener('click', async () => {
  recording?.pause()
})

btnStop.addEventListener('click', async () => {
  // Stop all running recordings
  const { recordings } = await roomSession.getRecordings();
  recordings.forEach(r => r.stop())
  recording = null
})

btnJoin.addEventListener('click', onJoinClicked)
btnLeave.addEventListener('click', onLeaveClicked)