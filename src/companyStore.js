import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const companyEdit = createAsyncThunk('appUsers/companyEdit', async id => {
    return id
})


export const appUsersSlice = createSlice({
    name: 'appUsers',
    initialState: {
      data: [],
      total: 1,
      params: {},
      allData: [],
      selectedUser: null
    },
    reducers: {},
    extraReducers: builder => {
      builder
        // .addCase(allCompanyData.fulfilled, (state, action) => {
        //   state.allData = action.payload
        // })
        .addCase(companyEdit.fulfilled, (state, action) => {
          state.selectedUser = action.payload
        })
        // .addCase(companyEditEmpty.fulfilled, (state, action) => {
        //   state.selectedUser = action.payload
        // })
      //   .addCase(getData.fulfilled, (state, action) => {
      //     state.data = action.payload.data
      //     state.params = action.payload.params
      //     state.total = action.payload.totalPages
      //   })
      //   .addCase(getUser.fulfilled, (state, action) => {
      //     state.selectedUser = action.payload
      //   })
      
    }
  })
  
  export default appUsersSlice.reducer