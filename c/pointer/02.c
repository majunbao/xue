#include <stdio.h>

int main(int argc, char const *argv[])
{
  char a[3];
  char b[2];

  printf("a %p\n", &a);
  printf("a[0] %p\n", &a[0]);
  printf("a[1] %p\n", &a[1]);
  printf("a[2] %p\n", &a[2]);

  printf("\n");

  printf("b %p\n", &b);
  printf("b[0] %p\n", &b[0]);
  printf("b[1] %p\n", &b[1]);
  printf("b[2] %p\n", &b[2]);
  return 0;
}
