a=0
b=0
gugudanLine=""
for a in range (2,10, 1):
  gugudanLine = gugudanLine + (" # %d단 #\t" %a)
print(gugudanLine)

for a in range (1,10, 1):
  gugudanLine=""  
  for b in range (2, 10, 1):
    gugudanLine = gugudanLine + str("%dX %d= %.2d \t"%(b,a,a*b))
  print(gugudanLine)
  
