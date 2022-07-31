import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TeamForm = (props) => {
    // get the state of a pet from the container component from the props
    const { team, handleChange, onCreate } = props

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Create a Sentai Team</h3>
                <small>Fields with a * are required.</small>
                <Form onSubmit={onCreate}>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Team Name*</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='teamName'
                            value={team.teamName}
                            placeholder='Enter name'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='colors'>Colors*</Form.Label>
                        <Form.Control
                            required
                            name='colors'
                            value={team.colors}
                            type='text'
                            placeholder='Enter suit colors separated by a comma'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='memberCount'># of Members*</Form.Label>
                        <Form.Control
                            required
                            name='memberCount'
                            value={team.memberCount}
                            type='number'
                            placeholder='Enter number of members'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='series'>Series No.*</Form.Label>
                        <Form.Control
                            required
                            name='series'
                            value={team.series}
                            type='number'
                            placeholder='Enter the series number for this show'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default TeamForm