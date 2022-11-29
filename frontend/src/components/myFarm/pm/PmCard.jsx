import React from 'react'
import Pm2p5Card from './Pm2p5Card'
import Pm10Card from './Pm10Card'

const PmCard = (props) => {

  return (
    <>
      {
        props.value === 'pm' ?
        <>
          { props.pm2p5 ? <Pm2p5Card deviceId={props.deviceId} /> : <></> }
          { props.pm10 ? <Pm10Card deviceId={props.deviceId} /> : <></> }
        </> 
        : <></>
      }
    </>
  )
}

export default PmCard