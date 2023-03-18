#include <iostream>
#include <string>

int main()
{
  std::string name;
  std::cout << "Enter your name: ";
  std::cin >> name;
  std::cout << "Hello " << name << std::endl;
  std::cout << "Your name is " << name.length() << " characters long." << std::endl;
  std::cout << "The first character of your name is " << name.front() << std::endl;
  std::cout << "The last character of your name is " << name.back() << std::endl;
  std::cout << "I'll call you " << name.append(" The Great") << std::endl;
  std::cin.ignore();
  return 0;
}
