import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email : null
}

export const EmailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        VerifyEmail:(state , action)=>{
            const {email} = action.payload;
            state.email = email
        }
    },
})
export const { VerifyEmail } = EmailSlice.actions
export default EmailSlice.reducer