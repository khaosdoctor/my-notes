function Person(name) {
  this.name = name;
}

Person.prototype.email = "foo@domain.com";
Person.prototype.getName = function() {
  return this.name;
};

var obj = new Person("Foo McBar");

console.log(obj.getName());