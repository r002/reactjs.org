import React, { useState } from 'react'

function App() {
  // highlight-range{1}
  [value, setValue] = useState({ something: 'something' })

  // highlight-range{2}
  return (
    <Provider value={value}>
      <Toolbar />
    </Provider>
  )
}
