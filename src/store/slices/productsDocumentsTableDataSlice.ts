import {createSlice} from '@reduxjs/toolkit';

export interface IProductsDocumentsTableData {
    pageable: Pageable;
    content: Content[];
}

export interface Content {
    [key: string]: any;
}

export interface Pageable {
    pageSize: number;
    pageIndex: number;
    totalPages?: number;
    totalElements?: number;
}

const initialState = {
    pageable: {
        pageSize: 0,
        pageIndex: 10,
    },
    content: [],
};

export const productsDocumentsTableData = createSlice({
    name: 'data/productsDocumentsTable',
    initialState,
    reducers: {
        setProductsDocumentsTableData(state: IProductsDocumentsTableData, action) {
            return {...action.payload.data};
        },
    },
});

export const {setProductsDocumentsTableData} = productsDocumentsTableData.actions;
