#ifndef ____TTTController__
#define ____TTTController__

#include<iostream>
#include <stdio.h>
#include <string>
#include "../model/TTTPlayer.h"

using namespace std;

class TTTController
{
    string GameBoard[3][3];
public:
    TTTController();
    ~TTTController();
    void createPlayer(std::string incomingJsonObjectString);
    void startNewGame();
    string setSelection(std::string incomingJsonObjectString);
    string getAllSavedPlayers();

    int getCurrentPlayer();
    string getGameDisplay();
    //string getGameDisplay(bool isJson);
private:
    Player player[2];
    gameBoard board;
    int curr_player;
    string EMPTY;
};

#endif /* defined(____TTTController__) */
