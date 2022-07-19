window.onload = function () {
  //Só vai executar quando tudo da página estiver carregado.

  var stage = document.getElementById('stage')
  document.addEventListener('keydown', keyPush)
  var ctx = stage.getContext('2d') //A parte grafica aonde irá aparecer o jogo.
  var score = document.querySelector('.score')
  var macaComida = 0

  var inicio = setInterval(game, 60)
  var somFundo = document.getElementById('somFundo')
  var somMordida = document.getElementById('somMordida')

  const vel = 1 //Velocidade da cobra
  var vx = (vy = 0) //Velocidade x e y igual a 0
  var px = 10 //Começa no ponto x e y igual a 10
  var py = 15
  var lp = 20 //Tamanho do quadrado
  var qp = 20 //Quantidade de peças
  var ax = (ay = 15) //Lugar da maça

  var trail = [] //rastro da cobra
  tail = 5 //Tamanho da calda

  function game() {
    px += vx
    py += vy
    if (px < 0) {
      //Se a cobra chegar a borda, vai tirae um quadrado
      px = qp - 1
    }
    if (px > qp - 1) {
      px = 0
    }
    if (py < 0) {
      py = qp - 1
    }
    if (py > qp - 1) {
      py = 0
    }

    //Pintar a area do game de black
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, stage.clientWidth, stage.height)

    //Pintar maça
    ctx.fillStyle = 'red'
    ctx.fillRect(ax * lp, ay * lp, lp, lp)

    //Pintar a cobra
    ctx.fillStyle = 'gray'
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * lp, trail[i].y * lp, lp, lp)
      if (trail[i].x == px && trail[i].y == py) {
        //Se a posição do rastro for igual a posição da cabeça, Se a cabeça esta tocando no rabo.
        gameOver()
      }
    }
    trail.push({ x: px, y: py })
    while (trail.length > tail) {
      trail.shift() //Se o tamanho for maior que a calda, retira
    }
    if (ax == px && ay == py) {
      macaComida++
      score.innerHTML = `SCORE: ${macaComida}`
      tail++
      ax = Math.floor(Math.random() * qp)
      ay = Math.floor(Math.random() * qp)
    }
  }

  function keyPush(event) {
    if (event.key === 'ArrowUp') {
      //Subir
      event.preventDefault()
      vx = 0
      vy = -vel
    } else if (event.key === 'ArrowDown') {
      //descer
      event.preventDefault()
      vx = 0
      vy = vel
    } else if (event.key === 'ArrowRight') {
      //direita
      event.preventDefault()
      vx = vel
      vy = 0
    } else if (event.key === 'ArrowLeft') {
      //esquerda
      event.preventDefault()
      vx = -vel
      vy = 0
    }
  }

  function gameOver() {
    vx = vy = 0
    tail = 5
    macaComida = 0
    score.innerHTML = `SCORE:${macaComida}`
  }
}
