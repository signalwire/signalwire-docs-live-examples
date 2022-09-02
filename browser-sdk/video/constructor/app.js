import './styles.css';
import { DEMO_TOKEN } from './constants';
import * as SignalWire from '@signalwire/js'

// Initialize the video
async function connect() {
  const roomSession = new SignalWire.Video.RoomSession({
    token: DEMO_TOKEN,
    rootElement: document.getElementById("myVideoElement"),
  });

  roomSession.on("member.joined", (e) => {
    console.log(`${e.member.name} joined`);
  });

  document.getElementById('btnLeave').addEventListener('click', () => {
    roomSession.leave()
  })

  roomSession.join();
}

connect()