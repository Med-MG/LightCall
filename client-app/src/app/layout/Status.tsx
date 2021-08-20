import React from 'react'
import { Route, Switch } from 'react-router'
import StatusList from '../features/Status/StatusList'
import StatusForm from '../features/Status/StatusForm'
import IdleTimerContainer from "../common/timer/IdleTimerContainer"

const Main = () => {
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Status</h1>
          
        </div>
      <StatusList/>
      </section>
    </div>
  )
}

export default Main
