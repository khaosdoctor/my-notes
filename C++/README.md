# C++

> Study guide for Cpp

## Table of Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [C++](#c)
  - [Table of Contents](#table-of-contents)
  - [Common structures](#common-structures)
  - [Printing out](#printing-out)
  - [Reading in](#reading-in)
  - [Variables](#variables)

<!-- /code_chunk_output -->

## Common structures

- All C++ files are `.cpp` files
- When including a header, which is like libraries, we use `#include <header>`
- The `main` function is the entry point of the program and is always required to have the following signature:

```cpp
int main() {
}
```

## Printing out

> Reference file [hello.cpp](./hello-world/hello.cpp)

Most CPP I/O will be done using the `iostream` header file containing the `cin` and `cout` objects. `cin` is used to read in input from the user, and `cout` is used to print out to the user.

```cpp
#include <iostream>

int main() {
  std::cout << "Hello World";
  std::cin.ignore();
  return 0;
}
```

The `std::cout` is a static call to the `cout` object in the `iostream` header file. We use `<<` to input data in the output stream and `cin.ignore()` to ignore all input and also will stop the program from exiting immediately.

## Reading in

> Reference file [ntmy.cpp](./nice-to-meet-you/ntmy.cpp) or [ntmy-2.cpp](./nice-to-meet-you/ntmy-2.cpp) or [ntmy-3.cpp](./nice-to-meet-you/ntmy-3.cpp)

To read data directly from the user in the console, we can either use `cin` or `getline`. `cin` will read in the first word, and `getline` will read in the entire line.

Also, to declare a string variable in C++, we need to use `std::string` instead of `string`, like in Java. And this requires us to have another include statement `#include <string>`.

```cpp
#include <iostream>
#include <string>

int main() {
  std::string name;
  std::cout << "Enter your name: ";
  getline(std::cin, name);
  std::cout << "Hello " << name << std::endl;
  std::cin.ignore();
  return 0;
}
```

We can use `std::endl` to print out a new line instead of a `\n`.

Also, the `<<` character is called the insertion operator, and it is used to insert data into the output stream and concatenate strings.

We can also read data from the user using `cin`:

```cpp
#include <iostream>
#include <string>

int main()
{
  std::string name;
  std::cout << "Enter your name: ";
  std::cin >> name;
  std::cout << "Hello " << name << std::endl;
  std::cin.ignore();
  return 0;
}
```

Instead of using `<<`, like in the `cout` operator, we use `>>` to insert data from the input stream into a variable.

## Variables

Variables are declared using the following syntax:

```cpp
type variable_name = value;
```

For example, to declare an integer variable `x` with value `5`, we can do the following:

```cpp
int x = 5;
```

We can also declare multiple variables of the same type in one line:

```cpp
int x = 5, y = 6, z = 50;
```

To declare a string variable, we need to import the `string` header file and use the `std::string` type:

```cpp
#include <string>

int main() {
  std::string name = "John";
  return 0;
}
```
