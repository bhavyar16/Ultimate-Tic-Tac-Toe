#include <iostream>
#include <string>
#include <sstream>
#include <fstream>
#include "controller/TTTController.h"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
using namespace rapidjson;
using namespace std;

int main()
{   
    TTTController controller;
    std::cout << "content-type: text/html\n\n"; 

    std::stringstream post;
    post << std::cin.rdbuf();
    std::string incomingJsonObjectString = post.str();

    const char* JsonObjectStr = incomingJsonObjectString.c_str();
    
    Document d;
    d.Parse(JsonObjectStr);
    Value& s = d["controllerMethod"]["method"];
    string methodname = s.GetString();

    if (methodname == "Player")
    {
        controller.createPlayer(incomingJsonObjectString);
    }
    else if(methodname == "setselection")
    {
        std:string val = controller.setSelection(incomingJsonObjectString);
        //std::cout << val;
    }
    else if(methodname == "resetGame")
    {
        controller.startNewGame();
        std::string display = controller.getGameDisplay();
        string vall = "{\"methodcalled\":\"resetGame\",\"displayboard\":\""+display+"\",\"currentplayer\":\"1\"}";
        cout<<vall;
    }
    else if(methodname == "showplayers")
    {
        std::string players = controller.getAllSavedPlayers();
        std::cout << players;
    
    }
}
