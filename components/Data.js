import React, { useReducer, useContext } from 'react'

const INITIAL_STATE = {
  usersList: [],
  userRepos: [],
  loading: false
}
const DataContext = React.createContext(INITIAL_STATE)
const DispatchContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'USERS':
      return {
        ...state,
        usersList: action.data
      }
    case 'USER_DETAILS':
      return {
        ...state,
        user: action.data
      }
    case 'USER_REPOS':
      return {
        ...state,
        userRepos: action.data
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.data
      }
    default:
      throw new Error(`Unkown action: ${action.type}`)
  }
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (
    <DispatchContext.Provider value={dispatch}>
      <DataContext.Provider value={state}>
        {children}
      </DataContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
export const useDataDispatch = () => useContext(DispatchContext)