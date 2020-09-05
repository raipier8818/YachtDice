import start, option, quit_game, os
default = 2
bonus = 0
def startmenu():
    os.system('cls')
    global default, bonus
    print("------------------")
    print("    Yatch Dice    ")
    print("------------------")

    print("1. Start")
    print("2. Option")
    print("3. Quit")

    num = input('num : ')

    if num == '1':
        os.system('cls')
        start.func_start(default,bonus)
    if num == '2':
        os.system('cls')
        default, bonus = option.settingPlayer()
        startmenu()
    if num == '3':
        os.system('cls')
        quit_game.func_quit()
    else:
        os.system('cls')
        startmenu()