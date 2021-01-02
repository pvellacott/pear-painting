import React from 'react'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

function Game({ data, err }) {
  if (err)  {
    return (
      <div>
        <h3 style={{ color: '#ee0000' }}>{err.msg}</h3>
      </div>
    )
  }
  return (
    <div>
      <h3>Connected to room: '{data?.id}'</h3>
    </div>
  )
}

const get = async (url) =>
  new Promise((resolve, reject) => {
    fetch(url).then(res => res.json()).then(data => {
      resolve(data)
    }).catch(err => reject(err))
  })

export async function getServerSideProps(context) {
  const id = context?.query?.id
  const headers = context?.req?.headers
  const host = headers?.host
  const protocol = headers?.['x-forwarded-proto'] || 'http'
  const data = await get(`${protocol}://${host}/api/v1/g/${id}/connect`)
  return { props: { ...data } }
}

export default withRouter(Game)
