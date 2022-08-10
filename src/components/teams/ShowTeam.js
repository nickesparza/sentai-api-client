import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getOneTeam, deleteTeam } from "../../api/teams"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingScreen from "../shared/LoadingScreen"
import { Card, Container, Button } from "react-bootstrap"

const ShowTeam = (props) => {
    const [team, setTeam] = useState(null)
    const { id } = useParams()
    const { msgAlert, user } = props
    const navigate = useNavigate()

    useEffect(() => {
        getOneTeam(id)
            .then(response => setTeam(response.data.team))
            .catch(err => {
                msgAlert({
                    heading: "Can't find Team",
                    message: messages.getTeamFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    // eslint-disable-next-line
    }, [])

    const onDelete = () => {
        deleteTeam(user, id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.deleteTeamSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: "An Error Occurred",
                    message: messages.deleteTeamFailure,
                    variant: 'danger'
                })
            })
    }

    if (!team) {
        return <LoadingScreen/>
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{team.teamName}</Card.Header>
                    <Card.Body>
                        <div>Series No. {team.series}</div>
                        {/* <div>{colorList}</div> */}
                        <div><small>Colors: {team.colors.join(", ")}</small></div>
                        <div><small>Member Count: {team.memberCount}</small></div>
                        <div><small>This show originally aired in the {team.era} era.</small></div>
                        {
                            team.owner && user && team.owner._id === user._id
                            ?
                            <>
                                <Link to={`/teams/${team.id}/edit`} team={team}>
                                    <Button variant="info">Edit this team</Button>
                                </Link>
                                <Button onClick={ onDelete } variant='danger'>Delete Team</Button>
                            </>
                            :
                            null
                        }
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowTeam