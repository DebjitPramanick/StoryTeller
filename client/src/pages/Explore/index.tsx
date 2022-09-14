import React, { useEffect, useState } from 'react'
import { popupMessage } from '../../helpers/common.helper'
import { getUsersByNameQuery } from '../../helpers/user.helper'
import ExploreUI from './ExploreUI'

const Explore = () => {

  const [query, setQuery] = useState('')
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    let delay = setTimeout(() => {
      if (query) fetchUsersByQuery()
    }, 3000)

    return () => clearTimeout(delay)
  }, [query])

  const fetchUsersByQuery = async () => {
    try {
      const res = await getUsersByNameQuery(query)
      setUsersList(res.data)
    } catch (err: any) {
      popupMessage('error', err.message)
    }
  }


  return (
    <ExploreUI
      query={query}
      handleQuery={(val: string) => setQuery(val)}
      usersList={usersList}
    />
  )
}

export default Explore