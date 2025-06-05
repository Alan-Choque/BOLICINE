import React from 'react'

const candyPage = async({params,}:{params: Promise<{ id: string }>}) => {
const {id} = await params;
    return (
    <div>candyPage: {id}</div>
  )
}

export default candyPage