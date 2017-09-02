navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia
navigator.getUserMedia({
  audio: false,
  video: true
}, (stream) => {
  let video = document.createElement('video')
  video.src = window.URL.createObjectURL(stream)
  video.autoplay = true
  document.body.appendChild(video)

  const conns = []
  let peer = new Peer('live', {host: 'localhost', port: 9000})
  peer.on('connection', (conn) => {
    peer.call(conn.peer, stream)

    conns.push(conn)
    conn.on('data', (data) => {
      conns.forEach((conn) => {
        conn.send(data)
      })
    })
  })
}, (err) => {
  console.log(err)
})
// const messages = []
// let peer_id, name, conn
