import React, { useEffect, useState } from 'react'
import { popupMessage } from '../../helpers/common.helper'
import { getUsersByNameQuery } from '../../helpers/user.helper'
import ExploreUI from './ExploreUI'

const Explore = () => {

  const [query, setQuery] = useState('')
  const [queryData, setQueryData] = useState({
    users: [],
    followers: {}
  })
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) setLoading(true);
    else {
      setLoading(false);
      setQueryData({
        users: [],
        followers: {}
      })
    }
    let delay = setTimeout(() => {
      if (query) fetchUsersByQuery()
    }, 2000)

    return () => clearTimeout(delay)
  }, [query])

  const fetchUsersByQuery = async () => {
    try {
      const res = await getUsersByNameQuery(query)
      if (res.data) {
        setQueryData(res.data);
      }

      setLoading(false)
    } catch (err: any) {
      popupMessage('error', err.message)
      setLoading(false)
    }
  }


  return (
    <ExploreUI
      query={query}
      handleQuery={(val: string) => setQuery(val)}
      data={queryData}
      loading={loading}
    />
  )
}

export default Explore