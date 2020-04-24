#include <iostream>
#include <stdio.h>
#include <string>
#include "TTTController.h"
#include "../model/TTTPlayer.h"
#include <sstream>
#include <fstream>
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace rapidjson;
using namespace std;

TTTController::TTTController(): curr_player(1), EMPTY(" ")
{
    
}

TTTController::~TTTController()
{
    
}

void TTTController::createPlayer(std::string incomingJsonObjectString)
{
    Document d;
    const char* JsonObjectStr = incomingJsonObjectString.c_str();

    d.Parse(JsonObjectStr);
    std::string playerval;
    Value& playerNum = d["controllerMethod"]["input"]["playernum"];
    std::string playerStr(playerNum.GetString());
    Value& name = d["controllerMethod"]["input"]["name"];
    std::string nameStr(name.GetString());
    Value& maker = d["controllerMethod"]["input"]["marker"];
    std::string markerstr(maker.GetString());

    std::ofstream file;

    if (playerStr == "1") 
    {
         file.open("input.txt");
    }
    else if(playerStr == "2")
    {
        file.open("input.txt", std::ios_base::app);
    }
    file << nameStr << endl;
    file << markerstr << endl;
    file.close();

}

/* Get the current player value */
int TTTController::getCurrentPlayer()
{
    static int flag = 0;
    if (flag == 0)
    {
        curr_player = 1;
        flag = 1;
    }
    else
    {
        flag = 0;
        curr_player = 2;
    }
    
    return curr_player;
}

string TTTController::getAllSavedPlayers()
{
    string value[4];
    int i = 0;
    ifstream myfile("input.txt");
    string line;
    if(myfile.is_open())
    {
        while (getline(myfile,line))
        {
            value[i] = line;
            i++;
        }
        
        myfile.close();
    }
    string value1 = value[0];
    string value2 = value[1];
    string value3 = value[2];
    string value4 = value[3];
    std::string selectvalue1 =  "{\"methodcalled\":\"showplayers\",\"players\":[{\"name\":\""+value1+"\",\"marker\":\""+value2+"\"},{\"name\":\""+value3+"\", \"marker\":\""+value4+"\"}]}";
    
    return selectvalue1;
}



/* Resets all the values */
void TTTController::startNewGame()
{
    board.createBoard();
}

string TTTController::setSelection(std::string incomingJsonObjectString)
{
    int row;
    int col;
    int currentPlayer;
   
    string value1[4];
    int k = 0;
    string line1;
    

     Document d;
    const char* JsonObjectStr = incomingJsonObjectString.c_str();

    d.Parse(JsonObjectStr);
    Value& row1 = d["controllerMethod"]["input"]["row"];
    int rowStr(row1.GetInt());
    Value& col1 = d["controllerMethod"]["input"]["col"];
    int colStr(col1.GetInt());
    Value& curr_player = d["controllerMethod"]["input"]["curr_player"];
    int curr_playerStr(curr_player.GetInt());
    Value& marker = d["controllerMethod"]["input"]["marker"];
    std::string markerStr(marker.GetString());
    Value& divId1 = d["controllerMethod"]["input"]["divId"];
    std::string divId(divId1.GetString());

    /*Value& jsonstring1 = d["allboardstring"]["board1"];
    std::string jsonstr1(jsonstring1.GetString());
    Value& jsonstring2 = d["allboardstring"]["board2"];
    std::string jsonstr2(jsonstring2.GetString());
    Value& jsonstring3 = d["allboardstring"]["board3"];
    std::string jsonstr3(jsonstring3.GetString());
    Value& jsonstring4 = d["allboardstring"]["board4"];
    std::string jsonstr4(jsonstring4.GetString());
    Value& jsonstring5 = d["allboardstring"]["board5"];
    std::string jsonstr5(jsonstring5.GetString());
    Value& jsonstring6 = d["allboardstring"]["board6"];
    std::string jsonstr6(jsonstring6.GetString());
    Value& jsonstring7 = d["allboardstring"]["board7"];
    std::string jsonstr7(jsonstring7.GetString());
    Value& jsonstring8 = d["allboardstring"]["board8"];
    std::string jsonstr8(jsonstring8.GetString());
    Value& jsonstring9 = d["allboardstring"]["board9"];
    std::string jsonstr9(jsonstring9.GetString());*/
    Value& jsonstring1 = d["boardstring"];
    std::string jsonstr1(jsonstring1.GetString());
    board.sendString(jsonstr1);
    int winnerstatus = board.determineWinner(curr_playerStr, markerStr);
    stringstream ss;
    string winnerstr1 ;
    ss << winnerstatus;
    string winnerstr = ss.str();

    Value& jsonstring2 = d["mainboardstring"];
    string jsonstr2(jsonstring2.GetString());

    if(curr_playerStr == 1 || curr_playerStr == 2)
    {
        if(divId == "board1")
            k = 0;
        else if(divId == "board2")
            k =1;
        else if(divId == "board3")
            k =2;
        else if(divId == "board4")
            k =3;
        else if(divId == "board5")
            k =4;
        else if(divId == "board6")
            k =5;
        else if(divId == "board7")
            k =6;
        else if(divId == "board8")
            k =7;
        else if(divId == "board9")
            k =8;

        jsonstr2[k] = markerStr[0];

        
        board.sendString(jsonstr2);
        int winnerstatus1 = board.determineWinner(curr_playerStr, markerStr);
        stringstream ss1;
        ss1 << winnerstatus1;
        winnerstr1 = ss1.str();
    }

    string display = getGameDisplay();
    stringstream ss3;
    ss3 << curr_playerStr;
    string curplayerstr = ss3.str();

    std::string tempavail = "{\"methodcalled\":\"setSelection\",\"displayselecteddata\": \""+display+"\", \"winstatus\":\""+winnerstr+"\", \"winstatus1\":\""+winnerstr1+"\", \"mainboardstring\":\""+jsonstr2+"\", \"curr_player\":\""+curplayerstr+"\"}";
    cout<<tempavail;
    return display;
}

std::string TTTController::getGameDisplay()
{
    string gameboard[3][3];
    string boardstring = board.getBoardVal();
    int k=0;
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            gameboard[i][j] = boardstring[k];
            k++;
        }
    }

    return boardstring;
}

