
const data = [
 'jaxsons',
 'phils',
 'parkers'
]

export default (req, res) => {
  const id = req?.query?.id
  res.setHeader('Content-Type', 'application/json')
  if (!data.includes(id)) {
    res.statusCode = 404
    res.end(JSON.stringify({
      err: { code: 404, msg: 'Given room does not exist / is not valid' }
    }))
  }
  res.end(JSON.stringify({
    data: {
      id,
      roomValid: true
    }
  }))
}
