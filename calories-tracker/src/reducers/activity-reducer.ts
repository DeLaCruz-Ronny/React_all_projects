import { Activity } from "../types"



export type ActivityActions = 
    { type: 'save-activity', payload: {newActivity: Activity} } |
    { type: 'set-activeid', payload: {id: Activity['id'] } } |
    { type: 'delete-activeid', payload: {id: Activity['id'] } } |
    { type: 'restart-app' } 


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(), //ANtes tenia el arreglo vacio []
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-activity') {
        let updatedActivities: Activity[] = []

        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
            //[...state.activities, action.payload.newActivity]
        }
    }

    if (action.type === 'set-activeid') {
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activeid') {
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}