# strings-to-regex

[![npm package](https://badge.fury.io/js/strings-to-regex.svg)](https://badge.fury.io/js/strings-to-regex)
![node version](https://img.shields.io/node/v/strings-to-regex.svg)
![npm type definitions](https://img.shields.io/npm/types/strings-to-regex)
[![Build Status](https://travis-ci.org/wimpyprogrammer/strings-to-regex.svg?branch=master)](https://travis-ci.org/wimpyprogrammer/strings-to-regex)
[![codecov](https://codecov.io/gh/wimpyprogrammer/strings-to-regex/branch/master/graph/badge.svg)](https://codecov.io/gh/wimpyprogrammer/strings-to-regex)
[![Known Vulnerabilities](https://snyk.io/test/github/wimpyprogrammer/strings-to-regex/badge.svg)](https://snyk.io/test/github/wimpyprogrammer/strings-to-regex)

Generate a compact Regular Expression that matches a finite set.

Have you ever seen a dense Regular Expression like this one to match the 50 US state abbreviations?

```regexp
/(A(L|K|Z|R)|C(A|O|T)|DE|FL|GA|HI|I(D|L|N|A)|K(S|Y)|LA|M(E|D|A|I|N|S|O|T)|N(E|V|H|J|M|Y|C|D)|O(H|K|R)|PA|RI|S(C|D)|T(N|X)|UT|V(T|A)|W(A|V|I|Y))/
```

This library generates patterns like that to match a list of strings you provide.

_To reverse this process and list which strings a Regular Expression would match, try [`regex-to-strings`](https://www.npmjs.com/package/regex-to-strings)._

## <a href="https://www.wimpyprogrammer.com/strings-to-regex/">Demo</a>

## API

### `condense(arrayOfStrings)`

Generate a Regular Expression to match all strings in `arrayOfStrings`. Respects the casing of the strings. Returns a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object.

```js
import { condense } from 'strings-to-regex';

const stringsToMatch = ['foo', 'foobar', 'Foo', 'fooBarBaz'];
const matcher = condense(stringsToMatch);
console.log(matcher); // /(foo(|bar|BarBaz)|Foo)/
```

---

### `condenseIgnoreCase(arrayOfStrings)`

A variation of `condense()` that ignores the casing of the strings. Returns a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object.

```js
import { condenseIgnoreCase } from 'strings-to-regex';

const stringsToMatch = ['foo', 'foobar', 'Foo', 'fooBarBaz'];
const matcher = condenseIgnoreCase(stringsToMatch);
console.log(matcher); // /foo(|bar(|baz))/i
```
