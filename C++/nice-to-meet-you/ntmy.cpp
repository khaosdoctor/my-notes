#include <iostream>
#include <string>

int main()
{
  std::cout << "Hello, World!\n";

  std::string name;
  std::cout << "What is your name?\n";
  getline(std::cin, name);

  std::cout << "Nice to meet you, " << name << "!\n";
  std::cin.ignore();
  return 0;
}
