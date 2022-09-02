import './styles.css';
import { DEMO_TOKEN } from './constants';
import * as SignalWire from '@signalwire/js'

const btnJoin = document.getElementById('btnJoin')
const btnLeave = document.getElementById('btnLeave')

// Initialize the video
async function join() {
  // Configure the room session
  const roomSession = new SignalWire.Video.RoomSession({
    token: DEMO_TOKEN,
    rootElement: document.getElementById("myVideoElement"),
  });

  // Set up event listeners
  roomSession.on("member.joined", (e) => {
    console.log(`${e.member.name} joined`);
  });

  // Disconnect when clicking on the "Leave" button
  btnLeave.onclick = async () => {
    await roomSession.leave()
    btnJoin.style.display = 'block'
    btnLeave.style.display = 'none'
  }

  btnJoin.style.display = 'none'

  // After everything is set up, join the room.
  await roomSession.join();

  btnLeave.style.display = 'block'
}

btnJoin.addEventListener('click', join)