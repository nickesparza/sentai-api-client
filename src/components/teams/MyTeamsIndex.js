import { useState, useEffect } from 'react'
import LoadingScreen from '../shared/LoadingScreen'
import Card from 'react-bootstrap/Card'
import { getMyTeams } from '../../api/teams'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'


const MyTeamsIndex = (props) => {
    const [teams, setTeams] = useState(null)
    const [error, setError] = useState(false)

    // when there is an error, call this and pass its arguments
    const { msgAlert, user } = props

    useEffect(() => {
        console.log('useEffect has run once on load')
        getMyTeams(user)
            .then(res => setTeams(res.data.teams))
            .catch(err => {
                msgAlert({
                heading: 'Error Getting Teams',
                message: messages.getTeamsFailure,
                variant: 'danger'
                })
                setError(true)
            })
    // eslint-disable-next-line
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // if pets haven't been loaded yet, show a loading message
    if (!teams) {
        return <LoadingScreen/>
    } else if (teams.length === 0) {
        return <p>You don't have any teams. Better create one!</p>
    }

    const myTeams = teams.map(team => (
        <Card style={{width: '24rem', margin: 7}} key={team.id}>
            <Card.Header>{ team.teamName }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/teams/${team.id}`}>View {team.teamName}</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
    
    // style for the card containers
    const cardContainerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    }

    return (
        <>
        <div style={cardContainerStyle}>
            {myTeams}
        </div>
        </>
    )
}

export default MyTeamsIndex