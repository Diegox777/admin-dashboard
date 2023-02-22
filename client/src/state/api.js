import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = 'http://192.168.3.4:5001';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Geography'],
  endpoints: build => ({
    getUser: build.query({
      query: id => `/general/users/${id}`,
      providesTags: ['User']
    }),
    getProducts: build.query({
      query: () => `/client/products`,
      providesTags: ['Products']
    }),
    getCustomers: build.query({
      query: () => '/client/customers',
      providesTags: 'Customers'
    }),
    getTransactions: build.query({
      query: ({ page, size, sort, search }) => ({
        url: '/client/transactions',
        method: 'GET',
        params: { page, size, sort, search}
      }),
      providesTags: ['Transactions']
    }),
    getGeography: build.query({
      query: () => '/client/geography',
      providesTags: ['Geography']
    })
  }) 
});

export const { 
  useGetUserQuery, 
  useGetProductsQuery, 
  useGetCustomersQuery, 
  useGetTransactionsQuery,
  useGetGeographyQuery
} = api;
