import {createSlice} from '@reduxjs/toolkit';

export const productsDocumentsTableData = createSlice({
    name: 'data/productsDocumentsTable',
    initialState: {},
    reducers: {
        setProductsDocumentsTableData(state, action) {
            return {...action.payload.data};
        },
    },
});

export const {setProductsDocumentsTableData} = productsDocumentsTableData.actions;
