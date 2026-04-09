#랜덤 라이브러리
import random

#로또 추첨 함수
def lotto_get():
  return random.randrange(1,46)

#로또 전체 리스트, 로또 요소 변수 선언
lotto_list=[]
num=0

#추첨 시작
print("** 로또 추첨을 시작합니다. **")

while True :
  num = lotto_get()
  #이미 뽑힌 숫자가 아닌 경우 append로 추가
  if lotto_list.count(num) == 0 :
    lotto_list.append(num)
  #리스트 요소 수가 6개 초과시 반복문 탈출
  if len(lotto_list)>=6:
    break

#완성된 리스트 정렬
lotto_list.sort()

#정렬된 리스트 요소 출력
for i in range(0,6):
  print("%d " %lotto_list[i], end="")
