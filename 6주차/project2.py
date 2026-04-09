#랜덤 라이브러리
import random
from tkinter.simpledialog import *

#문자열 입력 함수
def getString():
  string = ""
  string = askstring('문자열 입력','거북이 쓸 문자열을 입력')
  return string
  
#색깔 출력 함수
def getColor():
  r,g,b=0,0,0
  r = random.random()
  g = random.random()
  b = random.random()

#위치 출력 함수
def getPosition(w,h):
  x,y,angle,size=0,0,0,0
  x=random.randrange(-w/2, w/2)
  y=random.randrange(-h/2, h/2)
  angle=random.randrange(0,360)
  size=random.randrange(10,50)
  return [x,y,angle,size]
