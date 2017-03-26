#ifndef _List_H

struct Node;

List MakeEmpty( List L);
int isEmpty( List L );

#endif

struct Node {
  ElementType Element;
  Position Next;
}