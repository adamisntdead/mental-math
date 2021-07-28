import React from 'react'
import { useParams } from 'react-router-dom'
import GamePage from '../GamePage'

export default function CustomGamePage(props) {
  let { config } = useParams()

  // Validate the configuration
  const string = decodeURIComponent(config)
  const confObj = JSON.parse(string)

  return <GamePage timer={props.timer} user={props.user} custom={true} config={confObj} />
}