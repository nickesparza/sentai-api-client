import TeamsIndex from "./teams/TeamsIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)

	return (
		<>
            <div style={{textAlign: 'center'}}><h2>Super SentAPI Home</h2></div>
            <TeamsIndex msgAlert={ msgAlert } />
		</>
	)
}

export default Home
