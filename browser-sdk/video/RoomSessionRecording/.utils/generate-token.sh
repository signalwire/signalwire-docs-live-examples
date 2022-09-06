#!/bin/sh

curl -L -X POST 'https://guides.signalwire.com/api/video/room_tokens' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-u 'ProjectId:ApiToken' \
--data-raw '{
  "room_name": "demo",
  "user_name": "Guest",
  "permissions": [
    "room.hide_video_muted",
    "room.show_video_muted",
    "room.list_available_layouts",
    "room.set_layout",
    "room.recording",
    "room.playback",
    "room.set_meta",
    "room.member.audio_mute",
    "room.member.audio_unmute",
    "room.member.deaf",
    "room.member.promote",
    "room.member.demote",
    "room.member.undeaf",
    "room.member.remove",
    "room.member.set_input_sensitivity",
    "room.member.set_input_volume",
    "room.member.set_output_volume",
    "room.member.video_mute",
    "room.member.video_unmute",
    "room.self.audio_mute",
    "room.self.audio_unmute",
    "room.self.video_mute",
    "room.self.video_unmute",
    "room.self.deaf",
    "room.self.undeaf",
    "room.self.set_input_volume",
    "room.self.set_output_volume",
    "room.self.set_input_sensitivity"
  ]
}'
