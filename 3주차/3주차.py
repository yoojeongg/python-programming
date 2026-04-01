answer=0
select = int(input("1. 입력한 수식 계산 2. 두 수 사이의 합계 : "))

if (select == 1):
  a_1 = input("*** 수식을 입력하세요 : ")
  answer = eval(a_1)
  print("%s 결과는 %f 입니다. " %(a_1,answer))

elif (select == 2):
  a_2 = int(input("*** 첫 번째 숫자를 입력하세요 : "))
  b_2 = int(input("*** 두 번째 숫자를 입력하세요 : "))
  for i in range(a_2, b_2+1, 1):
    answer = answer + i
  print("%d+...%d는 %d입니다." %(a_2, b_2, answer))

else :
  print("1 또는 2만 입력해야 합니다.")
