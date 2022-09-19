import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTeams = () => {
    // remember that all types of fetches return a PROMISE
    return axios(`${apiUrl}/teams`)
}

export const getOneTeam = (id) => {
    console.log(`this is the id being sent:`, id)
    return axios(`${apiUrl}/teams/${id}`)
}

export const getMyTeams = (user) => {
    return axios({
        url: `${apiUrl}/${user._id}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

// create team call - POST
export const createTeam = (user, newTeam) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/teams',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
            team: {
                teamName: newTeam.teamName,
                colors: newTeam.colors.split(", "),
                memberCount: newTeam.memberCount,
                series: newTeam.series
            }
        },
	})
}

// update team call - PATCH
export const updateTeam = (user, info) => {
    // console.log('this is what it getting passed into patch', info)
    return axios({
        method: 'PATCH',
        url: apiUrl + `/teams/${info.id}`,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
        data: {
            team: {
                teamName: info.teamName,
                colors: info.colors.split(", "),
                memberCount: info.memberCount,
                series: info.series
            }
        }
    })
}

// delete team call - DELETE
export const deleteTeam = (user, teamId) => {
    return axios({
        method: 'DELETE',
        url: apiUrl + `/teams/${teamId}`,
        headers: {
			Authorization: `Token token=${user.token}`,
		}
    })
}

// update team route - PATCH

// delete team route - DELETE