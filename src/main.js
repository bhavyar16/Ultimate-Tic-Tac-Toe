/**Global JSON object used for keeping data available
when sending/receiving body content in requests/responses **/

var value = 0;
var flag = 0;
var flag1 = 0;
var player1Marker;
var player2Marker;
var TicTacToeJsonObj = 
{
  boardstring:
  {

  },
  mainboardstring:
  {

  },

  currentplayer:
  {

  },
  
  winstatus:
  {

  },
  playerinfo:
  {
    player1: {
      player1_name : {},
      player1_marker : {}
    },
    player2: {
      player2_name : {},
      player2_marker : {}
    }
  },
  players:
  [{
        players_name : {},
        players_marker: {},
         stats:{
          uwins:0,
          utie:0,
          uloss:0
        }
  }],
  allboardstring:
  {
    board1: {},
    board2: {},
    board3: {},
    board4: {},
    board5: {},
    board6: {},
    board7: {},
    board8: {},
    board9: {}
  },
  controllerMethod:
   {

   }
};

var cgiPath = "cgi-bin/auto.cgi";

function getInitData()
{
  //populateCreateGameList("getplayers", {});
}

function populatePlayerList(methodName, input)
{
	TicTacToeJsonObj.controllerMethod.method = methodName;
	TicTacToeJsonObj.controllerMethod.input= input;
	var jsonObjStringToSend = JSON.stringify(TicTacToeJsonObj);
	console.log("TicTacToeJsonObj ", TicTacToeJsonObj);
	console.log("TicTacToeJsonObj string to send to server", jsonObjStringToSend);
	
	var xhttp = new XMLHttpRequest();
	
    xhttp.open("POST", cgiPath, true);
    xhttp.send(jsonObjStringToSend);
}

function populateCreateGameList(methodName, input)
{
    TicTacToeJsonObj.controllerMethod.method = methodName;
    TicTacToeJsonObj.controllerMethod.input= input;
    var jsonObjStringToSend = JSON.stringify(TicTacToeJsonObj);
    console.log("TicTacToeJsonObj ", TicTacToeJsonObj);
    console.log("TicTacToeJsonObj string to send to server", jsonObjStringToSend);
    
    var xhttp2 = new XMLHttpRequest();
    
    xhttp2.open("POST", cgiPath, true);
    xhttp2.send(jsonObjStringToSend);
    xhttp2.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var retJsonObj = JSON.parse(this.responseText);
            console.log(retJsonObj);

            if(retJsonObj.methodcalled == 'setSelection')
            {
                console.log(retJsonObj.winstatus);
                console.log(retJsonObj.winstatus1);

                if(retJsonObj.winstatus == '0')
                {
                    document.getElementById("result").innerHTML = retJsonObj.winstatus;
                }
                else if(retJsonObj.winstatus == '1')
                {
                    document.getElementById("result").innerHTML = "Player 1 wins";
                    TicTacToeJsonObj.mainboardstring = retJsonObj.mainboardstring;
                    disableTable1();
                }
                else if (retJsonObj.winstatus == '2')
                {
                    document.getElementById("result").innerHTML = "player 2 wins";
                    TicTacToeJsonObj.mainboardstring = retJsonObj.mainboardstring;
                    disableTable1();
                }
                else if (retJsonObj.winstatus == '3')
                {
                    document.getElementById("result").innerHTML = "Match drawn";
                    disableTable1();
                }

                if(retJsonObj.winstatus1 == '0')
                {
                    //document.getElementById("result").innerHTML = retJsonObj.winstatus1;
                }
                else if(retJsonObj.winstatus == '1')
                {
                    document.getElementById("result").innerHTML = "Player 1 wins";
                    alert("Player 1 wins");
                    TicTacToeJsonObj.mainboardstring = retJsonObj.mainboardstring;
                    statupdate(retJsonObj.winstatus);
                }
                else if (retJsonObj.winstatus == '2')
                {
                    document.getElementById("result").innerHTML = "player 2 wins";
                    alert("Player 2 wins");
                    TicTacToeJsonObj.mainboardstring = retJsonObj.mainboardstring;
                    statupdate(retJsonObj.winstatus);
                }
                else if (retJsonObj.winstatus == '3')
                {
                    document.getElementById("result").innerHTML = "Match drawn";
                    alert("Player 2 wins");
                    statupdate(retJsonObj.winstatus);
                }
                TicTacToeJsonObj.boardstring   = retJsonObj.displayselecteddata;
                //TicTacToeJsonObj.currentplayer = retJsonObj.currentplayer;
                console.log("set selection:",TicTacToeJsonObj);
            }
            else if(retJsonObj.methodcalled == 'resetGame')
            {
              TicTacToeJsonObj.mainboardstring         = retJsonObj.displayboard;
              TicTacToeJsonObj.boardstring             = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board1   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board2   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board3   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board4   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board5   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board6   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board7   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board8   = retJsonObj.displayboard;
              TicTacToeJsonObj.allboardstring.board9   = retJsonObj.displayboard;
              TicTacToeJsonObj.currentplayer = retJsonObj.currentplayer;
              console.log("TicTacToeJsonObj: ",TicTacToeJsonObj);
            }
            else if(retJsonObj.methodcalled == 'startUltimateGame')
            {
              TicTacToeJsonObj.boardstring = retJsonObj.displayboard;
              TicTacToeJsonObj.currentplayer = retJsonObj.currentplayer;
              console.log("TicTacToeJsonObj: ",TicTacToeJsonObj);
            }
            else if(retJsonObj.methodcalled == 'showplayers')
            {
               console.log("retJsonObj.players");
               var vList = document.getElementById("playerlist");
               var returnedPlayers = retJsonObj.players;
               for(var i=0; i<returnedPlayers.length; i++)
               {
                    var listItem = document.createElement("li"); // Create a <li> node
                    var v = returnedPlayers[i];
                    var carDescr = document.createTextNode(v.name+" "+v.marker);
                    listItem.appendChild(carDescr);
                    vList.appendChild(listItem);
                    console.log(retJsonObj.players);
                }
               console.log("TicTacToeJsonObj: ",TicTacToeJsonObj);
            }
        }
    };
}

function populateselectist(methodName, input)
{
    TicTacToeJsonObj.controllerMethod.method = methodName;
    TicTacToeJsonObj.controllerMethod.input= input;
    var jsonObjStringToSend = JSON.stringify(TicTacToeJsonObj);
    console.log("setSelectionJsonObj ", TicTacToeJsonObj);
    console.log("setSelectionJsonObj string to send to server", jsonObjStringToSend);
    
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var retJsonObj = JSON.parse(this.responseText);
            console.log(retJsonObj);
        }
    }
    xhttp1.open("POST", cgiPath, true);
    xhttp1.send(jsonObjStringToSend);
    

}
function toggleDisplay(divId)
{
   	var divElement = document.getElementById(divId);
	if(divElement.style.display == 'block')
	divElement.style.display = 'none';
	else
	divElement.style.display = 'block';
}

function addPlayer(playerid) {
    var player = {};
    if(playerid == '1')
    {
        player.name = document.getElementById("name").value;
        player.marker = document.getElementById("marker").value;
        player.playernum = playerid;
        player1Marker = player.marker;
    }
    else if(playerid == '2')
    {
        player.name = document.getElementById("name1").value;
        player.marker = document.getElementById("marker1").value;
        if(player.marker == player1Marker)
        {
            alert("Enter different marker!");
            document.getElementById("marker1").value = '';
            return;
        }
        player.playernum = playerid;
        player2Marker = player.marker;
        var btn = document.getElementById("player2");
        btn.disabled = true;
    }

	populatePlayerList("Player", player);
 
}

function setselection(divId, selectval) {
    var select = {};
    var curr_player;
    var marker;
    
    var div = document.getElementById(divId);
    var cell = div.getElementsByTagName("td")[selectval];
    
    if(cell.innerHTML == player1Marker || cell.innerHTML == player2Marker)
    {
        return;
    }
    console.log("hello");
    console.log(flag);
    if (flag == 0)
    {
        curr_player = 1;
        flag = 1;
        console.log("curr_player ", curr_player);
        marker = player1Marker;
    }
    else
    {
        flag = 0;
        curr_player = 2;
        console.log("curr_player ", curr_player);
        marker = player2Marker;
    }
    
    cell.innerHTML = marker;

    if(divId == 'board1')        
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board1;
    else if(divId == 'board2')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board2;
    else if(divId == 'board3')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board3;
    else if(divId == 'board4')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board4;
    else if(divId == 'board5')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board5;
    else if(divId == 'board6')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board6;
    else if(divId == 'board7')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board7;
    else if(divId == 'board8')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board8;
    else if(divId == 'board9')
        TicTacToeJsonObj.boardstring = TicTacToeJsonObj.allboardstring.board9;

    str = TicTacToeJsonObj.boardstring;
    var outerRowVal = OuterRow(divId);
    var outerColVal = OuterCol(divId);
    select.outerRow = outerRowVal;
    select.outerCol = outerColVal;

    if(selectval == '0')
    {
        console.log("flag");
        console.log(flag1);
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board1').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableAllTables(selectval);
            $('#board1').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
            console.log("entered disable table");
            disableTable(selectval);
        }
        
        
        select.row = 0;
        select.col = 0;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        
        str = marker + str.slice(1);
    }
    else if(selectval == '1')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board2').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        
        select.row = 0;
        select.col = 1;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(2);
    }
    else if(selectval == '2')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board3').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
       
        select.row = 0;
        select.col = 2;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(3);
    }
    else if(selectval == '3')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board4').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        
        select.row = 1;
        select.col = 0;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(4);
    }
    else if(selectval == '4')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board5').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        select.row = 1;
        select.col = 1;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(5);
    }
    else if(selectval == '5')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board6').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        
        select.row = 1;
        select.col = 2;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(6);
    }
    else if(selectval == '6')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board7').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }

        select.row = 2;
        select.col = 0;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(7);
    }
    else if(selectval == '7')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board8').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        
        select.row = 2;
        select.col = 1;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(8);
    }
    else if(selectval == '8')
    {
        if(flag1 == 0)
        {
            disableAllTables();
            $('#board9').each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            disableTable(selectval);
        }
        select.row = 2;
        select.col = 2;
        select.curr_player = curr_player;
        select.marker = marker;
        select.divId = divId;
        str = str.slice(0,selectval) + marker + str.slice(9);
    }

    TicTacToeJsonObj.boardstring = str;
    if(divId == 'board1')        
        TicTacToeJsonObj.allboardstring.board1 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board2')
        TicTacToeJsonObj.allboardstring.board2 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board3')
        TicTacToeJsonObj.allboardstring.board3 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board4')
        TicTacToeJsonObj.allboardstring.board4 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board5')
        TicTacToeJsonObj.allboardstring.board5 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board6')
        TicTacToeJsonObj.allboardstring.board6 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board7')
        TicTacToeJsonObj.allboardstring.board7 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board8')
        TicTacToeJsonObj.allboardstring.board8 = TicTacToeJsonObj.boardstring;
    else if(divId == 'board9')
        TicTacToeJsonObj.allboardstring.board9 = TicTacToeJsonObj.boardstring;

    populateCreateGameList("setselection", select);
    
}

function OuterRow(board) {
var row;
  if(board == '1') { row = 0; }
  else if(board == '2') { row = 0; }
  else if(board == '3') { row = 0; }
  else if(board == '4') { row = 1; }
  else if(board == '5') { row = 1; }
  else if(board == '6') { row = 1; }
  else if(board == '7') { row = 2; }
  else if(board == '8') { row = 2; }
  else if(board == '9') { row = 2; }
return row;
}

function OuterCol(board) {
var col;
  if(board == '1') { col = 0; }
  else if(board == '2') { col = 1; }
  else if(board == '3') { col = 2; }
  else if(board == '4') { col = 0; }
  else if(board == '5') { col = 1; }
  else if(board == '6') { col = 2; }
  else if(board == '7') { col = 0; }
  else if(board == '8') { col = 1; }
  else if(board == '9') { col = 2; }
return col;
}

function createGame()
{
    var select = {};
    resetTable();
    populateCreateGameList("resetGame", select);
    flag = 0;
    flag1 = 0;
}

function createUltimateGame()
{
  var select = {};
  populateCreateGameList("createtUltimateGame", select);
}

function showPlayers()
{
  var select = {};
  populateCreateGameList("showplayers", select);

}

function resetTable(){
  for(var i=1;i<10;i++){
    for(var j=0;j<9;j++){
      var div = 'board' + i;
      var divElement = document.getElementById(div);
      divElement.getElementsByTagName("td")[j].innerHTML = "";
    }
  }
  enableAllTables();
}
function disableAllTables()
{
    $('#board2').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board1').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board3').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board4').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board5').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board6').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board7').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board8').each(function()
    {
        this.style.pointerEvents = 'none';
    });
    $('#board9').each(function()
    {
        this.style.pointerEvents = 'none';
    });
}

function enableAllTables()
{
    $('#board2').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board1').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board3').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board4').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board5').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board6').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board7').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board8').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
    $('#board9').each(function()
    {
        this.style.pointerEvents = 'auto';
    });
}


function disableTable1()
{
    flag1 = 1;
    for(var i = 0; i < 9; i++)
    {
        var board = TicTacToeJsonObj.mainboardstring[i];
        var k = i + 1;
        var div = '#board' + k;
        if(board != '-')
        {
            $(div).each(function()
            {
                this.style.pointerEvents = 'none';
            });
        }
        else
        {

            $(div).each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
    }
}

function disableTable(selectval)
{
    flag1 = 1;
    for(var i = 0; i < 9; i++)
    {
        var board = TicTacToeJsonObj.mainboardstring[i];
        var k = i + 1;
        var div = '#board' + k;
        if(board != '-')
        {
            if(selectval == i)
            {
                enableAllTables();
                ++selectval;
                var div1 = '#board' + selectval;
                $(div1).each(function()
                {
                    this.style.pointerEvents = 'none';
                });
                return;
            }
           
            $(div).each(function()
            {
                this.style.pointerEvents = 'none';
            });
        }
        else if(board == '-' && selectval == i)
        {
            $(div).each(function()
            {
                this.style.pointerEvents = 'auto';
            });
        }
        else
        {
            $(div).each(function()
            {
                this.style.pointerEvents = 'none';
            }); 
        }
    }
}



function statupdate(winstatus)
{
    if(winstatus == '1')
    {
        var count = 0;
        ++count;
        uwins = count;
        var count1 = 0;
        document.getElementById("stats").innerHTML = "uwins" + uwins;
        document.getElementById("stats").innerHTML = "uloss" + count1;
        document.getElementById("stats").innerHTML = "utie" + count1;
    }
    else if (winstatus == '2') 
    {

        var count = 0;
        ++count;
        uloss = count;
        var count1 = 0;
        document.getElementById("stats").innerHTML = "uwin" + uloss;
        document.getElementById("stats").innerHTML = "uloss" + count1;
        document.getElementById("stats").innerHTML = "utie" + count1;
    }
    else if (winstatus == '3') 
    {
       
       var count = 0;
        ++count;
        utie = count;
        var count1 = 0;
        document.getElementById("stats").innerHTML = "uwin" + count1;
        document.getElementById("stats").innerHTML = "uloss" + count1;
        document.getElementById("stats").innerHTML = "utie" + utie;
    }
}


