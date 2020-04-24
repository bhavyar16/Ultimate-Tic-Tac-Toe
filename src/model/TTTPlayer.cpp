#include <iostream>
#include <stdio.h>
#include <cstring>
#include "TTTPlayer.h"
#include <sstream>
#include <fstream>

using namespace std;

Player::Player(): name("bramakr"), marker("X")
{
    
}

Player::~Player()
{
    
}

gameBoard::gameBoard()
{

}

gameBoard::~gameBoard()
{

}
void gameBoard::createBoard(){

for(int i=0;i<3;i++){
    for(int j=0;j<3;j++){
        gameboard[i][j] = "-";
          }
       }
  }

string gameBoard::getBoardVal()
  {
  string board;
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
          board = board + gameboard[i][j];
        }
      }

    return board;
  }

/* Compute the winner */
bool gameBoard::computeWinner(string marker)
{
	std::ofstream file;
    file.open("input7.txt");
    file << marker << endl;
    bool winner = false;
    if(gameboard[0][0] == gameboard[0][1] && gameboard[0][1] == gameboard[0][2] && gameboard[0][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[1][0] == gameboard[1][1] && gameboard[1][1] == gameboard[1][2] && gameboard[1][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[2][0] == gameboard[2][1] && gameboard[2][1] == gameboard[2][2] && gameboard[2][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[0][0] == gameboard[1][0] && gameboard[1][0] == gameboard[2][0] && gameboard[2][0] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[0][1] == gameboard[1][1] && gameboard[1][1] == gameboard[2][1] && gameboard[2][1] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[0][2] == gameboard[1][2] && gameboard[1][2] == gameboard[2][2] && gameboard[2][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[0][0] == gameboard[1][1] && gameboard[1][1] == gameboard[2][2] && gameboard[2][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    else if(gameboard[2][0] == gameboard[1][1] && gameboard[1][1] == gameboard[0][2] && gameboard[0][2] == marker)
    {
    	file << "win" << endl;
        winner = true;
        return winner;
    }
    file.close();
    
    return winner;

}

/* Determine the winner */
int gameBoard::determineWinner(int currentPlayer, string marker)
{

	std::ofstream file;
    file.open("input6.txt");
    file << currentPlayer << endl;
    file << marker << endl;
    bool winner = true;
    bool value  = gameBoardFull();
    if (value == true)
    {
        //cout << "game board is full" << endl;
        return 3;
    }
    
    /* Compute winner */
    winner = computeWinner(marker);
    if (winner == true)
    {
        if (currentPlayer == 1)
        {
        	file << "hello1" << endl;
            return currentPlayer;
        }
        else if(currentPlayer == 2)
        {
        	file << "hello2" << endl;
            return currentPlayer;
        }
    }
    file.close();
    return 0;
}

bool gameBoard::gameBoardFull()
{
	std::ofstream file;
    file.open("input8.txt");
    bool check_availability = true;
    int i = 0;
    int j = 0;
    while (check_availability)
    {
        for (i=0; i < 3; i++)
        {
            for (j=0; j < 3; j++)
            {
                if (gameboard[i][j] == "-")
                {
                	file << check_availability << endl;
                    check_availability = false;
                }
            }
        }
        break;
    }
    
    return check_availability;
    
}

void gameBoard::sendString(string jsonboardstring)
{
  string boardstring = jsonboardstring;

  int k=0;
  for(int i=0;i<3;i++)
  {
    for(int j=0;j<3;j++)
    {
        //cout<< "boardstringk" << boardstring[k] << endl;
    	gameboard[i][j] = boardstring[k];
    	k++;
    }
  }
}