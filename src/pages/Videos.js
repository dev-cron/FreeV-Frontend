import React from 'react'
import {useParams} from 'react-router-dom';

export const Videos = () => {
  const {param} = useParams();
  return (
    <>
    <h2>HTTP Video Streaming</h2>
    <p>This video is 61MB and is being streamed instead of downloaded.</p>
    <p>
      Feel free to seek through the video and it only loads the part you want to
      watch
    </p>
    <video id="videoPlayer" width="650" controls muted="muted" autoplay>
      <source src={`/mongo-video/${param}`} type="video/mp4" />
    </video>
    <i>Big Buck Bunny</i>
    </>
  )
}
