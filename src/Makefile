LDFLAGS = -lm
CFLAGS  = -g -Wall -Weffc++ -Wextra -pedantic

INCDIR = -I/group/course/cpsc8700/lib/rapidjson-master/include

ttt:    main.o controller.o model.o
	g++ ${CFLAGS} -o ttt main.o TTTController.o TTTPlayer.o ${LDFLAGS} ${INCDIR}

main.o: main.cpp controller/TTTController.h
	g++ ${CFLAGS} -c main.cpp ${INCDIR}

controller.o: controller/TTTController.cpp controller/TTTController.h model/TTTPlayer.h
	g++ ${CFLAGS} -c controller/TTTController.cpp ${INCDIR}

model.o: model/TTTPlayer.cpp model/TTTPlayer.h
	g++ ${CFLAGS} -c model/TTTPlayer.cpp ${INCDIR}

clean:
	rm -rf *.o
	rm -rf *~
	rm -rf ttt a.out