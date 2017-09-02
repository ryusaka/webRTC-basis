let peer = new Peer({host: 'localhost', port: 9000})

peer.on('call', function(call) {
  call.answer()
  call.on('stream', function(stream) {
    let video = document.createElement('video')
    video.src = window.URL.createObjectURL(stream)
    video.autoplay = true
    document.body.appendChild(video)
  })
})

const conn = peer.connect('live')

document.addEventListener('click', (e) => {
  let text = prompt('コメントを入力して下さい')
  if (text) {
    conn.send({type: 'comment', text: text})
  }
})

conn.on('data', (data) => {
  if (data.type === 'comment'){
    let comment = document.createElement('div')
    comment.className = 'comment'
    comment.textContent = data.text
    document.body.appendChild(comment)
    
    comment.style.top = Math.floor(Math.random() * window.innerHeight) + 'px'
    comment.style.left =  - comment.offsetWidth + 'px'
    setTimeout(() => {
      comment.body.removeChild(comment)
    }, 5000)
  }
})
