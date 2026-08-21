speed = 0.1

shape(100)
  .scale(1,1,1.78)
  .out(o0)

src(o0)
  .modulateRotate(osc(()=>-mouse.x / width),()=> -mouse.y / height)
  .modulateScrollX(src(o1),()=>-mouse.x / width,0.2)
  .modulateScrollY(src(o2),()=> -mouse.y / height,0.5)
  .thresh().invert()
  .out(o1)

shape(4)
  .scale(1,1,1.78)
  .modulateScale(src(o2))
  .modulateRepeat(src(o1),4,2)
  .thresh()
  .invert()
  .out(o2)

render(o2)