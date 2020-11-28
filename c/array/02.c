
#include <stdio.h>

int main()
{
  int i1 = 10;       //变量i储存在栈区中
  const int i2 = 20; //const局部变量也存储在stack
  int i3 = 30;
  printf("i1: %p\n", &i1);
  printf("i2: %p\n", &i2);
  printf("i3: %p\n", &i3);
  return 0;
}

// 140732706134088
// 140732706134084
// 140732706134080