import { off } from 'process'
import React, { ErrorInfo, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getFeeds } from '../../helpers/feeds.helper'
import FeedsUI from './FeedsUI'

const Feeds: React.FC<any> = () => {

  const [feeds, setFeeds] = useState([])


  useEffect(() => {
    fetchFeeds()
  }, [])

  const fetchFeeds = async () => {
    try {
      const res = await getFeeds();
      setFeeds(res.data)
    } catch (err: any) {
      toast.error(err.message, {
        autoClose: 3500,
        pauseOnHover: true,
      })
    }
  }

  return (
    <FeedsUI
      feeds={feeds} />
  )
}

export default Feeds