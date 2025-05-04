import React from 'react'
import InputCustomStyles from './child/InputCustomStyles'
import InputStatus from './child/InputStatus'
import MasterLayout from '../masterLayout/MasterLayout'

const ApplicationSettings = () => {
    return (
    <MasterLayout>
        <div className="row">
            <h6>Application Settings</h6>
            <p>Manage your application settings</p>
            <InputStatus />

        </div>
    </MasterLayout>
    )
}

export default ApplicationSettings
