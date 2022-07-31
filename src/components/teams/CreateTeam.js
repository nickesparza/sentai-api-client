import TeamForm from '../shared/TeamForm'
import { useState } from 'react'
import { createTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

const CreateTeam = (props) => {
    const [team, setTeam] = useState({
        teamName: '',
        colors: '',
        memberCount: '',
        series: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setTeam(prevTeam => {
            const updatedValue = e.target.value
            const updatedName = e.target.name
            const updatedTeam = {
                [updatedName]: updatedValue
            }
            return {
                ...prevTeam,
                ...updatedTeam
            }
        })
    }
    
    const onCreate = (event) => {
		event.preventDefault()
        console.log('this is the event', event)
		const { msgAlert } = props

		createTeam(team)
            .then(navigate(`/`))
			.then(() =>
				msgAlert({
					heading: 'Team Created',
					message: messages.createTeamSuccess,
					variant: 'success',
				})
			)
			.catch((error) => {
                setTeam({
                    teamName: '',
                    colors: '',
                    memberCount: '',
                    series: ''
                })
				msgAlert({
					heading: 'Creation failed: ' + error.message,
					message: messages.createTeamFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <TeamForm team={team} handleChange={handleChange} onCreate={onCreate}/>
    )
}

export default CreateTeam