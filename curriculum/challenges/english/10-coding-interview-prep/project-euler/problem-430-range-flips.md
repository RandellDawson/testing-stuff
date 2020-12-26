---
id: 5900f51a1000cf542c51002d
title: 'Problem 430: Range flips'
challengeType: 5
forumTopicId: 302101
---

# --description--

N disks are placed in a row, indexed 1 to N from left to right.

Each disk has a black side and white side. Initially all disks show their white side.

At each turn, two, not necessarily distinct, integers A and B between 1 and N (inclusive) are chosen uniformly at random. All disks with an index from A to B (inclusive) are flipped.

The following example shows the case N = 8. At the first turn A = 5 and B = 2, and at the second turn A = 4 and B = 6.

Let E(N, M) be the expected number of disks that show their white side after M turns. We can verify that E(3, 1) = 10/9, E(3, 2) = 5/3, E(10, 4) ≈ 5.157 and E(100, 10) ≈ 51.893.

Find E(1010, 4000). Give your answer rounded to 2 decimal places behind the decimal point.

# --hints--

`euler430()` should return 5000624921.38.

```js
assert.strictEqual(euler430(), 5000624921.38);
```

# --seed--

## --seed-contents--

```js
function euler430() {

  return true;
}

euler430();
```

# --solutions--

```js
// solution required
```