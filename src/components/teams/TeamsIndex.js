import { useState, useEffect } from 'react'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Table } from 'react-bootstrap'
import { getAllTeams } from '../../api/teams'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'


const TeamsIndex = (props) => {
    const [teams, setTeams] = useState(null)
    const [error, setError] = useState(false)

    // when there is an error, call this and pass its arguments
    const { msgAlert } = props

    useEffect(() => {
        console.log('useEffect has run once on load')
        getAllTeams()
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
        return <p>Nobody's here fighting for justice. Better get a team together.</p>
    }

    const allTeams = teams.map(team => (
        <tr key={team.id}>
            <td>{team.teamName}</td>
            <td><Link to={`teams/${team.id}`}>View</Link></td>
        </tr>
    ))

    return (
        <>
        <Container>
            <Table striped bordered hover variant='dark'>
                <tbody>
                    {allTeams}
                </tbody>
            </Table>
        </Container>
        </>
    )
}

export default TeamsIndex