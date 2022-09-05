import './styles.css';
import { DEMO_TOKEN } from './constants';
import * as SignalWire from '@signalwire/js'

const btnJoin = document.getElementById('btnJoin')
const btnLeave = document.getElementById('btnLeave')
const inCallControls = document.getElementById('inCallControls')
const btnShareScreen = document.getElementById('btnShareScreen')

let roomSession;
let screenShare;

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
  await roomSession.leave()
  screenShare = null
  btnJoin.style.display = 'block'
  inCallControls.style.display = 'none'
}

/**
 * Starts or stops the screen sharing.
 */
async function onShareScreenClicked() {
  if (screenShare) {
    await screenShare.leave()
    screenShare = null
  } else {
    screenShare = await roomSession.startScreenShare()
  }
}

btnJoin.addEventListener('click', onJoinClicked)
btnLeave.addEventListener('click', onLeaveClicked)
btnShareScreen.addEventListener('click', onShareScreenClicked)