import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTeams = () => {
    // remember that all types of fetches return a PROMISE
    return axios(`${apiUrl}/teams`)
}

export const getOneTeam = (id) => {
    return axios(`${apiUrl}/teams/${id}`)
}

// create team call - POST
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

// update team call - PATCH
export const updateTeam = (info) => {
    // console.log('this is what it getting passed into patch', info)
    return axios({
        method: 'PATCH',
        url: apiUrl + `/teams/${info.id}`,
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
export const deleteTeam = (id) => {
    console.log('this is what is getting passed in', id)
    return axios({
        method: 'DELETE',
        url: apiUrl + `/teams/${id}`
    })
}

// update team route - PATCH

// delete team route - DELETE