import { useMutation, useQuery } from '@apollo/client';
import React, { useState, createContext, useEffect } from 'react';
import { client } from '../../apollo';
import { RECURRENT_USER } from '../graphql/mutations';
import { GET_USER } from '../graphql/querys';

export const AuthContext = createContext({
  user: undefined,
  login: () => { },
  logout: () => { }
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  const result = useQuery(GET_USER)
  const [userRecurrent, {loadingData, data, error}] = useMutation(RECURRENT_USER)
  const login = () => {
    if (result?.data?.getUser) {
      setUser(result?.data?.getUser)
    }
  }
  const logout = () => {
    setUser(null)
  }
  
  const getUser = async () => {
    try {
      setUser(result?.data?.getUser)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (result?.loading && !result.data) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [result?.loading])
  useEffect(() => {
    getUser()
    if (!token) {
      client.resetStore()
    }
    if(result?.data){
      userRecurrent()
    }

  }, [result, token])

  const valueContext = {
    user,
    login, logout, loading
  }
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  )
}