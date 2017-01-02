num_knights = int(raw_input("Digite o numero de cavaleiros\n"))
day = str(raw_input("Digite o dia\n"))
enemy = str(raw_input("Digite o inimigo\n"))

if enemy == 'killer bunny':
    print('Holy hand grenade!')
else: 
    if num_knights < 3 or day == 'monday':
        print('Retreat!')
    elif num_knights >= 10 and day == 'wednesday':
        print("Trojan Rabbit")
    else:
        print('Truce?')

a = input("digite qualquer coisa")
