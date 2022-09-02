import './styles.css';
import * as SignalWire from '@signalwire/js'

const DEFAULT_TOKEN = "eyJ0eXAiOiJWUlQiLCJjaCI6InJlbGF5LnNpZ25hbHdpcmUuY29tIiwiYWxnIjoiSFM1MTIifQ.eyJpYXQiOjE2NjAyODA0ODUsImp0aSI6ImE4NTc5MzU2LTc0NGItNGM5OS05NWQ2LTZhMTY4YmEyNTFhZCIsInN1YiI6IjUwNmNlYTMzLWViNDctNGI1Ni04MmIwLWQzYzVhZmFmMzlkNCIsInUiOiJxdWlja3Rva2VudXNlciIsImphIjoibWVtYmVyIiwiciI6InJvb20iLCJzIjpbInJvb20ubGlzdF9hdmFpbGFibGVfbGF5b3V0cyIsInJvb20uc2VsZi5hdWRpb19tdXRlIiwicm9vbS5zZWxmLmF1ZGlvX3VubXV0ZSIsInJvb20uc2VsZi52aWRlb19tdXRlIiwicm9vbS5zZWxmLnZpZGVvX3VubXV0ZSIsInJvb20uc2VsZi5kZWFmIiwicm9vbS5zZWxmLnVuZGVhZiIsInJvb20uc2VsZi5zZXRfaW5wdXRfdm9sdW1lIiwicm9vbS5zZWxmLnNldF9vdXRwdXRfdm9sdW1lIiwicm9vbS5zZWxmLnNldF9pbnB1dF9zZW5zaXRpdml0eSIsInJvb20uaGlkZV92aWRlb19tdXRlZCIsInJvb20uc2hvd192aWRlb19tdXRlZCJdLCJhY3IiOnRydWUsIm1hIjoiYWxsIiwiZXJwIjp0cnVlLCJtdGEiOnt9LCJybXRhIjp7fX0.ke-qPuTmp6tUOgdHMHv_i82PjuWQgr8lsX_VRS_Krq4nwYt3REGhSn1p68N3gXTXxp7DGd6dIJIzJwjVZvdDmA"

// Initialize the video
async function connect() {
  const roomSession = new SignalWire.Video.RoomSession({
    token: DEFAULT_TOKEN,
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