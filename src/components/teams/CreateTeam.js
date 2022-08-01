import TeamForm from '../shared/TeamForm'
import { useState } from 'react'
import { createTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const CreateTeam = (props) => {
    const [team, setTeam] = useState({
        teamName: '',
        colors: '',
        memberCount: '',
        series: ''
    })

    const {user, msgAlert} = props

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
		

		createTeam(user, team)
            .then(res => navigate(`/teams/${res.data.team.id}`))
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
        <Container>
        <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h1>Create a Sentai Team</h1>
                </div>
            </div>
        <TeamForm team={team} handleChange={handleChange} onSubmit={onCreate}/>
        </Container>
    )
}

export default CreateTeam