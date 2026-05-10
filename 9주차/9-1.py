import matplotlib.pyplot as plt
course = {'TOEIC' : 0,'TOFEL' : 0,'TOEIC SPEAKING' : 0,'OPIC' : 0,'IELTS' : 0,}
print('수강하고 싶은 강좌를 입력하세요.')
print('복수 개의 강좌를 입력하려면 콤마로 구분하세요.')

while True:
  s=input('TOEIC, TOFEL, TOEIC SPEAKING, OPIC, IELTS, 종료 : ')
  
  if s=='종료':
    break
  for a in s.split(','):
    if a in course : course[a]+=1
    else : print(f'{a}는 등록되지 않은 강좌입니다.')

plt.figure(figsize=(5.5,3))
plt.bar(course.keys(),course.values(),color='g',width=0.6)
plt.title('preferred english course')
plt.xlabel('english course')
plt.ylabel('frequency')
plt.show()
