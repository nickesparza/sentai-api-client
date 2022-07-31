import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTeams = () => {
    // remember that all types of fetches return a PROMISE
    return axios(`${apiUrl}/teams`)
}

export const getOneTeam = (id) => {
    return axios(`${apiUrl}/teams/${id}`)
}

// create team route - POST
export const createTeam = (info) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/teams',
		data: {
            team: {
                teamName: info.teamName,
                colors: info.colors.split(", "),
                memberCount: info.memberCount,
                series: info.series
            }
        },
	})
}

// update team route - PATCH

// delete team route - DELETE