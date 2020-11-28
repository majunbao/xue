#include <stdio.h>

int main(int argc, char const *argv[])
{
  char x = '1', y = '2', z = '3', a;
  printf("x %p\n", &x);
  printf("y %p\n", &y);
  printf("z %p\n", &z);
  printf("a %p\n", &a);
  return 0;
}
