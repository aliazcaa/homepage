speed = 1

s0.initCam()

src(s0)
  //.scale(1,1,1.78)
  .out(o0)

src(o0)
  .diff(shape([1,100].ease('easeInOutSine').smooth()))
  .scale(1,1,1.78)
  .modulatePixelate(src(o3),[4,4000].ease('easeInOutCubic'))
  .modulateScale(src(o1),()=>Math.sin(time)*0.5,0.5)
  .modulateScrollY(src(o2),()=>Math.sin(time),-0.5)
  .thresh().invert()
  .out(o1)

shape(4)
  .scale(1,1,1.78)
  .modulateRepeat(src(o1),[1,2,3,5,7]
                  //.ease('easeInOutSine').smooth(),[2,4,6,8,10]
                  //.ease('easeInOutCubic').smooth()
                 )
  .modulateScale(src(o3),[10,8,4,2,1].fast(2),1,1.78)
  .thresh()
  .invert()
  .scale([0.3,1,0.9,0.4,0.5,0.6].fast())
  .invert()
  .out(o2)

src(o2)
  //.modulateKaleid(src(o2))
  //.blend(src(s0))
  .modulateScrollX(src(o1),0.5,()=>Math.sin(time)*0.5)
  .modulateScrollY(src(o2),0.5,()=>Math.sin(time)*-0.5)
  .modulate(src(o3))
  .out(o3)

render(o2)
