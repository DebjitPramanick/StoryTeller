import React, { useState } from 'react'
import ExploreUI from './ExploreUI'

const Explore = () => {

  const [query, setQuery] = useState('')

  return (
    <ExploreUI
      query={query}
      handleQuery={(val: string) => setQuery(val)}
    />
  )
}

export default Explore