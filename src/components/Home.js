import TeamsIndex from "./teams/TeamsIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Sentai Homepage</h2>
            <TeamsIndex msgAlert={ msgAlert } />
		</>
	)
}

export default Home
