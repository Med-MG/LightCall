import React from 'react'
import { Route, Switch } from 'react-router'
import ProjectForm from '../features/project/ProjectForm'
import ProjectsList from '../features/project/ProjectsList'



const Main = () => {
    return (
        <div className="main-content">
        <section className="section">
        <div className="section-header">
            <h1>Projects</h1>
        </div> 
        <Switch>
            <Route exact path="/user/projects/" component={ProjectsList} />
            <Route exact path="/Projects/AddProject" component={ProjectForm} />
        </Switch>

        </section>
      </div>
    )
}

export default Main
