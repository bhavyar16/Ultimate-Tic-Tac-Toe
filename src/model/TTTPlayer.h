#ifndef ____TTTPlayer__
#define ____TTTPlayer__

#include <iostream>
#include <stdio.h>
#include <cstring>

using namespace std;

class Player
{
public:
	Player();
    ~Player();
    void setName(string tempName)
    {
        name = tempName;
    }
    
    void setMarker(string tempmarker)
    {
        marker = tempmarker;
    }
    
    string getMarker()
    {
        return marker;
    }

private:
    string name;
    string marker;
    
};

class gameBoard
{
  string gameboard[3][3];
public:
  gameBoard();
  ~gameBoard();
  void createBoard();
  string getBoardVal();
  void sendString(string jsonboardstring);
  int determineWinner(int currentPlayer, string marker);
  bool gameBoardFull();
  bool computeWinner(string marker);
};

#endif /* defined(____TTTPlayer__) */
