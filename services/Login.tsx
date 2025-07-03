import React, { useEffect, useState } from 'react'
import axios from 'axios'

export async function isUserRegistered(data: { username: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/user/exists`,
      data
    )
    return response
  } catch (error: any) {
    return error.response || null
  }
}

export async function postAuth(data: { username: string; password: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/`,
      data
    )
    return response
  } catch (error: any) {
    return error.response || null
  }
}
