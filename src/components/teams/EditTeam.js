import TeamForm from '../shared/TeamForm'
import { useState, useEffect } from 'react'
import { updateTeam, getOneTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'

const EditTeam = (props) => {
    // this gets the team id from the params to look up the right data. it is NOT in props
    const { id } = useParams()
    const navigate = useNavigate()
    // this gets the msgAlert function from the last page. it is NOT in the params
    const { msgAlert } = props
    const [team, setTeam] = useState({
        teamName: '',
        colors: '',
        memberCount: '',
        series: ''
    })

    useEffect(() => {
        getOneTeam(id)
            .then(response => {
                response.data.team.colors = response.data.team.colors.join(', ')
                setTeam(response.data.team)   
            }) 
            .catch(err => {
                msgAlert({
                    heading: "Can't find Team",
                    message: messages.getTeamFailure,
                    variant: 'danger'
                })
                navigate(`/teams/${id}`)
            })
    // eslint-disable-next-line
    }, [])

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
    
    const onUpdate = (event) => {
		event.preventDefault()
        console.log('this is the event', event)

		updateTeam(team)
			.then(() =>
				msgAlert({
					heading: 'Team Successfully Updated',
					message: messages.createTeamSuccess,
					variant: 'success',
				})
			)
            .then(navigate(`/teams/${id}`))
			.catch((error) => {
                msgAlert({
					heading: 'Update failed failed: ' + error.message,
					message: messages.updateTeamFailure,
					variant: 'danger',
				})
                navigate(`/teams/${id}`)
			})
	}

    if (!team) {
        return <LoadingScreen/>
    }

    return (
        <Container>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h1>Edit {team.teamName}</h1>
                </div>
            </div>
        <TeamForm team={team} handleChange={handleChange} onSubmit={onUpdate}/>
        </Container>
    )
}

export default EditTeam