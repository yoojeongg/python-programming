a = int(input("입력 진수 결정(16/10/8/2) : "))
b = input("값 입력 : ")

# 입력값을 10진수로 변환
if a == 16:
    num_10 = int(b, 16)
if a == 10:
    num_10 = int(b, 10)
if a == 8:
    num_10 = int(b, 8)
if a == 2:
    num_10 = int(b, 2)

print("10진수 ==> ", num_10)
print("16진수 ==> ", hex(num_10))
print("8진수 ==> ", oct(num_10))
print("2진수 ==> ", bin(num_10))
