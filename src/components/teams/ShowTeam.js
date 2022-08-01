import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getOneTeam, deleteTeam } from "../../api/teams"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingScreen from "../shared/LoadingScreen"
import { Card, Container } from "react-bootstrap"

const ShowTeam = (props) => {
    const [team, setTeam] = useState(null)
    const { id, msgAlert } = useParams()
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
        deleteTeam(id)
            .then(navigate('/'))
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
                        <Link to={`/teams/${team.id}/edit`} team={team}>
                            Edit this team
                        </Link>
                        <button onClick={ onDelete }>Delete Team</button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowTeam