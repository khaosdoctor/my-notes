import requests

def main():
	addr = requests.get('http://www.viacep.com.br/ws/09230580/json').json()
	bairro = addr['bairro']
	print(bairro)

main()