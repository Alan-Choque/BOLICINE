import React from 'react'

const addsPage = async({params,}:{params: Promise<{ id: string }>}) => {
const {id} = await params;
    return (
    <div>addsPage: {id}</div>
  )
}

export default addsPage