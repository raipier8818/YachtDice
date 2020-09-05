import random as rd
import quit_game, os
import calculateScore as cal


class Player():
    def __init__(self,playerNum):
        self.num = playerNum + 1
        self.dice_arr = [0,0,0,0,0]
        self.scoreboard = [0,0,0,0,0,0,0,0,0,0,0,0]
        self.visit = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        self.Turn = False

    def TurnStart(self):
        self.Turn = True

    def TurnEnd(self):
        self.dice_arr = [0,0,0,0,0]
        self.Turn = False

    def rollDice(self,rerollArr):
        for i in rerollArr:
            self.dice_arr[i-1] = rd.randint(1,6)


    def updateScoreboard(self,updateNum,updateScore):
        self.scoreboard[updateNum-1] = updateScore
        self.visit[updateNum-1] = 1


def calculate_score(player):
    YACHT = cal.yatch(player.dice_arr)
    ONES = cal.count_func(1, player.dice_arr)
    TWOS = cal.count_func(2, player.dice_arr)
    THREES = cal.count_func(3, player.dice_arr)
    FOURS = cal.count_func(4, player.dice_arr)
    FIVES = cal.count_func(5, player.dice_arr)
    SIXES = cal.count_func(6, player.dice_arr)
    FULL_HOUSE = cal.full_house(player.dice_arr)
    FOUR_OF_A_KIND = cal.four_of_a_kind(player.dice_arr)
    SMALL_STRAIGHT = cal.small_straight(player.dice_arr)
    LARGE_STRAIGHT = cal.large_straight(player.dice_arr)
    CHOICE = sum(player.dice_arr)
    copy = [ONES, TWOS, THREES, FOURS, FIVES, SIXES, CHOICE, FULL_HOUSE, FOUR_OF_A_KIND, SMALL_STRAIGHT, LARGE_STRAIGHT,
            YACHT]

    if player.visit[0] == -1:
        print('1. ONES : [', ONES, ']')
    else:
        print('ONES : ', player.scoreboard[0])

    if player.visit[1] == -1:
        print('2. TWOS : [', TWOS, ']')
    else:
        print('TWOS : ', player.scoreboard[1])

    if player.visit[2] == -1:
        print('3. THREES: [', THREES, ']')
    else:
        print('THREES : ', player.scoreboard[2])

    if player.visit[3] == -1:
        print('4. FOURS : [', FOURS, ']')
    else:
        print('FOURS : ', player.scoreboard[3])

    if player.visit[4] == -1:
        print('5. FIVES : [', FIVES, ']')
    else:
        print('FIVES : ', player.scoreboard[4])

    if player.visit[5] == -1:
        print('6. SIXES : [', SIXES, ']')
    else:
        print('SIXES : ', player.scoreboard[5])

    if player.visit[6] == -1:
        print('7. CHOICE : [', CHOICE, ']')
    else:
        print('CHOICE : ', player.scoreboard[6])

    if player.visit[7] == -1:
        print('8. FULL HOUSE : [', FULL_HOUSE, ']')
    else:
        print('FULL HOUSE : ', player.scoreboard[7])

    if player.visit[8] == -1:
        print('9. FOUR OF A KIND : [', FOUR_OF_A_KIND, ']')
    else:
        print('FOUR OF A KIND : ', player.scoreboard[8])

    if player.visit[9] == -1:
        print('10. SMALL STRAIGHT : [', SMALL_STRAIGHT, ']')
    else:
        print('SMALL STRAIGHT : ', player.scoreboard[9])

    if player.visit[10] == -1:
        print('11. LARGE STRAIGHT : [', LARGE_STRAIGHT, ']')
    else:
        print('LARGE STRAIGHT : ', player.scoreboard[10])

    if player.visit[11] == -1:
        print('12. YATCH : [', YACHT, ']')
    else:
        print('YATCH : ', player.scoreboard[11])

    return copy

def turn(player):
    player.Turn = True
    copy = calculate_score(player)
    while True:
        print('---------------------------')

        while True:
            check = int(input('What do you want to Add? : '))
            if check >= 1 and check <= 12:
                break

        print('---------------------------')
        if player.visit[check-1] == -1:
            player.scoreboard[check-1] = copy[check-1]
            player.visit[check-1] = 1
            break

def printScoreboard(arr):
    print('Score : ',arr)

def play(player, t):
    player.TurnStart()
    Re = [1,2,3,4,5]

    for i in range(3):
        os.system('cls')
        print('---------------------------')
        print('Player', player.num, ' >> turn ', t + 1, ' / chance >> ', i + 1)
        player.rollDice(Re)

        printScoreboard(player.scoreboard)

        print('...........................')
        print('[ Roll the Dices ]')
        print('...........................')
        print('Dice : ', player.dice_arr)
        print('---------------------------')

        if i != 2:
            while True:
                Re = list(map(int,input('Press the dice number that you want to reroll or Press -1 : ').split()))
                if len(Re) == 1 and Re[0] == -1:
                    break

                if 0 <= max(Re) <= 6 or 6 >= min(Re) > 0:
                    break

        if Re[0] == -1:
            break

    turn(player)
    printScoreboard(player.scoreboard)

    player.TurnEnd()

def func_start(player_num, bonus):
    playerArr = []
    for _ in range(player_num):
        player = Player(_)
        playerArr.append(player)

    for _ in range(12 + bonus):
        for i in range(player_num):
            play(playerArr[i], _)
            os.system('cls')


    for i in playerArr:
        print('---------------------------')
        print('Player 1 ', i.num)
        printScoreboard(i.scoreboard)

        print('Score : ',sum(i.scoreboard))
        print('---------------------------')


    quit_game.func_quit()