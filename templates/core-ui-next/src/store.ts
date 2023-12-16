import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: 'light',
}

type Action = {
  type: string
  [key: string]: any // This allows for flexibility in action payload
}

const changeState = (state = initialState, { type, ...rest }: Action) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)

// Define types for the Redux store
type Store = typeof store // Define Store type
export type AppDispatch = Store['dispatch'] // Define AppDispatch type
export type RootState = ReturnType<Store['getState']> // Define RootState type

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store // Export the configured Redux store
