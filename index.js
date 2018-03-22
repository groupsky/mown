#!/usr/bin/env node
const ctx = require('axel')

ctx.clear()

const grass = ';'
const colorGrass = [ 78, 191, 34 ]
const mower = ',`.=.'
const colorMower = [ colorGrass, [ 217, 217, 217 ], [ 217, 217, 217 ], [ 221, 60, 105 ], [ 217, 217, 217 ] ]

ctx.brush = grass
ctx.bg(0, 0, 0)
ctx.fg.apply(ctx, colorGrass)
ctx.box(1, 1, ctx.cols, ctx.rows)

let mowerX = -1
let mowerY = 1
let mowerDirection = 1

let timer = setInterval(moveMower, 25)

function quit () {
  clearInterval(timer)
  timer = false
  process.exit()
}

function moveMower () {
  mowerX += mowerDirection
  if (mowerX - mower.length > ctx.cols) {
    mowerY++
    mowerDirection = -1
  } else if (mowerX + mower.length < 1) {
    mowerY++
    mowerDirection = 1
  }
  if (mowerY > ctx.rows) quit()
  drawMower()
}

function drawMower () {
  let x
  ctx.bg(0, 0, 0)
  for (let i = 1; i <= mower.length; i++) {
    x = mowerX + i * mowerDirection
    if (x < 1 || x > ctx.cols) continue
    ctx.fg.apply(ctx, colorMower[ i - 1 ])
    ctx.text(x, mowerY, mower[ i - 1 ])
  }
  ctx.cursor.restore()
}

ctx.cursor.restore()
