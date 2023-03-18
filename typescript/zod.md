# Checagem de tipos em runtime com Zod

> Curso original: https://www.totaltypescript.com/tutorials/zod/number

> Exemplos [na pasta Zod](./zod)
## O que é o Zod

[Zod](https://www.npmjs.com/package/zod) é uma biblioteca para checagem de tipos em runtime com TypeScript. Diferentemente do TypeScript, que checa os tipos em nível de desenvolvimento, ou seja, durante o código até o momento da build, o Zod faz a checagem de tipos em runtime, durante a execução da aplicação.

Isso nos dá o poder de fazer com que nossos tipos sejam validados durante a execução da aplicação e possamos manter a segurança deles mesmo depois de termos passado do momento de desenvolvimento. Transformando o código em algo muito mais seguro e fácil de manter.

Diferentemente de outras bibliotecas como o JOI, que faz a validação de dados de entrada ou de qualquer tipo de objeto contra um schema, o Zod também gera tipos em tempo real, dessa forma temos a validação em runtime refletindo o que a validação em desenvolvimento está dizendo e vice-versa.

## Checagem de tipos básica

Imagina que temos a seguinte função

```ts
export const toString = (num: unknown) => {
  return String(num);
};
```

Aqui temos um valor que está tipado como `unknown` já que não sabemos qual será o tipo dele, isso significa que podemos chamar o `toString()` com qualquer tipo que quisermos:

```ts
toString("string");
toString(null);
toString(undefined);
toString({ obj: 1 });
toString(1);
```

E isso não vai ser um problema, mas queremos garantir que isso não aconteça durante a execução, para isso podemos fazer uma checagem de tipos com o Zod dentro da função:

```ts
import { z } from "zod";

export const toString = (num: unknown) => {
  const parsed = z.number().parse(num);
  return String(parsed);
};
```

Caso esse valor não seja um número, vamos ter um erro, que podemos testar inclusive com esse código:

```ts
// CODE
import { expect, it } from "vitest";
import { z } from "zod";

export const toString = (num: unknown) => {
  const parsed = z.number().parse(num);
  return String(parsed);
};

// TESTS

it("Should throw a runtime error when called with not a number", () => {
  expect(() => toString("123")).toThrowError(
    "Expected number, received string"
  );
});

it("Should return a string when called with a number", () => {
  expect(toString(1)).toBeTypeOf("string");
});
```

E a parte interessante é que o tipo de retorno da função irá mudar para `string` já que o `z.number()` garante que o valor que será passado para a função será um número.

## Tipando retornos de API

Um outro exemplo interessante é quando temos uma função que faz uma requisição para uma API e retorna um objeto, por exemplo:

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.unknown();
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch("https://swapi.dev/api/people/" + id).then((res) =>
    res.json()
  );

  const parsedData = PersonResult.parse(data);

  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
```

Aqui temos um objeto que não sabemos o tipo, mas sabemos que ele tem um campo chamado `name`, então podemos tipar o objeto com o `z.unknown()` e depois fazer a checagem de tipos com o `PersonResult.parse(data)`. Mas o tipo será `unknown` e não podemos retornar esse tipo de objeto. Para podermos tipar a API propriamente dita, podemos fazer o seguinte:

```ts
// CODE
import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.object({
  name: z.string(),
});
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch("https://swapi.dev/api/people/" + id).then((res) =>
    res.json()
  );

  const parsedData = PersonResult.parse(data);

  return parsedData.name;
};
```

Agora o tipo de retorno da função será `string` e não `unknown` e podemos usar o `parsedData.name` sem problemas. Além disso, se printarmos a variável `data` vamos ver que o retorno da API é, na verdade, muito maior do que o que estamos tipando. O que acontece é que o Zod vai remover todos os tipos que não forem condizentes com o `schema`, ou seja, se tivermos um campo que não está no schema, ele será removido. Por isso que, quando colocamos `name` no schema, vamos ter o `name` no retorno se ele existir na API.

## Arrays

Outro exemplo interessante é quando temos um array de objetos, por exemplo:

```ts
const StarWarsPerson = z.object({
  name: z.string(),
})

const StarWarsPeopleResults = z.unknown()

export const fetchStarWarsPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json(),
  )

  const parsedData = StarWarsPeopleResults.parse(data)

  return parsedData.results
}
```

É o mesmo exemplo anterior, mas agora temos um array de pessoas com a propriedade `name` dentro de uma outra chave `results`, para isso podemos usar um tipo do Zod como tipo principal

```ts
const StarWarsPerson = z.object({
  name: z.string(),
})

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson)
})

export const fetchStarWarsPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json(),
  )

  const parsedData = StarWarsPeopleResults.parse(data)

  return parsedData.results
}
```

Agora temos um objeto `StarWarsPerson` que é um objeto simples, e outro objeto `StarWarsPeopleResults` que é um objeto que tem um campo `results` que é um array de `StarWarsPerson`, e podemos usar os tipos do Zod, ou seja, o schema que criamos anteriormente para o `StarWarsPerson` para poder incluir dentro do tipo do `StarWarsPeopleResults`.

## Inferindo e extraindo tipos

Tudo é muito bacana quando estamos fazendo a tipagem em termos de código, mas e quando queremos usar esses tipos em outros lugares? Por exemplo, se quisermos usar o tipo de `StarWarsPerson` em outro lugar? Tipo aqui:

```ts
// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

const logStarWarsPeopleResults = (data: unknown) => {
  //                                    ^ 🕵️‍♂️
  data.results.map((person) => {
    console.log(person.name);
  });
};
```

Aqui temos uma função que recebe um objeto `unknown` e tenta fazer um `map` nele, mas o objeto `unknown` não tem o campo `results` e nem o campo `name` e o TypeScript vai reclamar. Para podermos usar o tipo de `StarWarsPerson` em outro lugar, podemos usar o `z.infer`:

```ts
// CODE
import { z } from "zod"

const StarWarsPerson = z.object({
  name: z.string(),
})

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
})

const logStarWarsPeopleResults = (data: z.infer<typeof StarWarsPeopleResults>) => {
  data.results.map((person) => {
    console.log(person.name)
  })
}
```

O que acontece é que podemos usar o `z.infer` para inferir o tipo de um schema e usar esse tipo em outro lugar. O `z.infer` recebe um `schema` e retorna o tipo do schema. No nosso caso, o `z.infer<typeof StarWarsPeopleResults>` vai retornar o tipo do `StarWarsPeopleResults` que é um objeto que tem um campo `results` que é um array de `StarWarsPerson`. Essa "função" do Zod não é bem uma função, mas sim um tipo exportado que vai inferir o tipo interno do schema.

## Opcionais

Outro exemplo interessante é quando temos um campo opcional, por exemplo:

```ts
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  //                     ^ 🕵️‍♂️
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};
```

Nesse exemplo estamos simulando um formulário no front-end, como podemos fazer para que o nosso número de telefone seja opcional e não tenha nenhum erro quando não passarmos ele para a API? Para isso podemos usar o `z.optional`:

```ts
const Form = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
})

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values)

  return parsedData
}
```

## Enums

Podemos também definir enumeradores para o Zod entender que um campo só pode receber um valor específico, por exemplo:

```ts
import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.string(),
  //              ^ 🕵️‍♂️
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};
```

Neste caso como podemos fazer para que `privacyLevel` seja uma de duas strings: `Public` ou `Private`?

Podemos adicionar um `z.enum`:

```ts
// CODE

import { expect, it } from "vitest"
import { z } from "zod"

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.enum(['public', 'private'])
})

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values)

  return parsedData
}
```

Veja que estamos passando um array para esse `z.enum` e ele vai entender que o campo `privacyLevel` só pode receber um desses valores.

Além disso, podemos jogar esses valores em uma constante e usar ela no `z.enum`:

```ts
const VALUES = ["Salmon", "Tuna", "Trout"] as const;
const FishEnum = z.enum(VALUES);
```

## Unions e literals

Podemos também usar o `z.union` para definir que um campo pode receber um tipo ou outro, por exemplo:

```ts
const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.union([z.literal("private"), z.literal("public")]),
})
```

Veja que estamos passando um array para o `z.union` e dentro deste array estamos passando dois tipos literais: `z.literal("private")` e `z.literal("public")`. O `z.union` vai entender que o campo `privacyLevel` pode receber um desses dois tipos literais.

## Tipos complexos

O Zod permite que você utilize validações pré prontas, como URL, Email e etc. O que podemos fazer para transformar esse formulário:

```ts
import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  //             ^ 🕵️‍♂️
  phoneNumber: z.string().optional(),
  //                    ^ 🕵️‍♂️
  email: z.string(),
  //              ^ 🕵️‍♂️
  website: z.string().optional(),
  //                ^ 🕵️‍♂️
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};
```

Em um formulário que só aceita valores válidos? Podemos usar o `z.string().url()` para validar se o campo `website` é uma URL válida e o `z.string().email()` para validar se o campo `email` é um email válido:

```ts
// CODE

import { expect, it } from "vitest"
import { z } from "zod"

const Form = z.object({
  name: z.string(),
  //             ^ 🕵️‍♂️
  phoneNumber: z.string().min(8).max(11).optional(),
  //                    ^ 🕵️‍♂️
  email: z.string().email(),
  //              ^ 🕵️‍♂️
  website: z.string().url().optional(),
  //                ^ 🕵️‍♂️
})

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values)

  return parsedData
}
```

Veja que estamos validando o campo `phoneNumber` para que ele tenha no mínimo 8 caracteres e no máximo 11 caracteres, que é um número brasileiro de telefone, porém podemos usar também `z.regex` para validar se o campo `phoneNumber` é um número de telefone válido:

```ts
// regex para telefone brasileiro
const PHONE_REGEX = /^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/;
const Form = z.object({
  name: z.string(),
  //             ^ 🕵️‍♂️
  phoneNumber: z.string().regex(PHONE_REGEX).optional(),
  //                    ^ 🕵️‍♂️
  email: z.string().email(),
  //              ^ 🕵️‍♂️
  website: z.string().url().optional(),
  //                ^ 🕵️‍♂️
});
```

## Extends e Merge

Podemos também usar o `z.extend` para extender um schema e o `z.merge` para mesclar dois schemas:

```ts
const ObjectWithId = z.object({
  id: z.string().uuid(),
});

const User = ObjectWithId.extend({
  name: z.string(),
});

const Post = ObjectWithId.extend({
  title: z.string(),
  body: z.string(),
});

const Comment = ObjectWithId.extend({
  text: z.string(),
});
```

O objeto final de cada um vai ser o `ObjectWithId` com as propriedades adicionais que definimos no `extend`. Além disso podemos também mesclar dois schemas usando o `z.merge`:

```ts
const User = ObjectWithId.merge(
  z.object({
    name: z.string(),
  }),
);
```

Diferente do `z.extend` o `z.merge` vai mesclar os dois schemas, ou seja, o objeto final vai ser o `ObjectWithId` com as propriedades do `z.object` que definimos no `merge`. A maior diferença entre eles é que o `z.extend` vai sobrescrever as propriedades do schema que você está extendendo, já o `z.merge` vai mesclar os dois schemas.

## Transform

E se precisarmos fazer alguma transformação logo que recebemos os dados? Podemos usar o `z.transform` para fazer isso. Vamos imaginar que precisamos de uma nova propriedade no nosso objeto que é o `nameAsArray`, essa propriedade vai pegar a propriedade `name` que já existe e transformar em um array de strings:

```ts
import { expect, it } from "vitest"
import { z } from "zod"

const StarWarsPerson = z.object({
  name: z.string(),
})

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
})

export const fetchStarWarsPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json(),
  )

  const parsedData = StarWarsPeopleResults.parse(data)

  return parsedData.results
}
```

Agora vamos usar o `z.transform` para transformar o `name` em um array de strings:

```ts
import { z } from "zod"

const StarWarsPerson = z.object({
  name: z.string(),
}).transform((person) => ({
  ...person,
  nameAsArray: person.name.split(" ")
}))

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
})

export const fetchStarWarsPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json(),
  )

  const parsedData = StarWarsPeopleResults.parse(data)

  return parsedData.results
}
```
