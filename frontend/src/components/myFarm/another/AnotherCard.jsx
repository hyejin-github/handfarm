import React from 'react'
import CdsCard from './CdsCard'
import AltitudeCard from './AltitudeCard'
import PressureCard from './PressureCard'

const AnotherCard = (props) => {
  return (
    <>
      {
        props.value === 'another' ? 
        <>
          { props.light? <CdsCard deviceId={props.deviceId} /> : <></> }
          { props.altitude? <AltitudeCard deviceId={props.deviceId} /> : <></> }
          { props.pressure? <PressureCard deviceId={props.deviceId} /> : <></> }
        </> : <></>
      }
    </>
  )
}

export default AnotherCard