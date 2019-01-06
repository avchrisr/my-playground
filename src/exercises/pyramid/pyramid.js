// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides

// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'


// SOLUTION  --  O(n) time | O(n) space
// width
// p(1) = 1
// p(2) = 3
// p(3) = 5
// p(4) = 7
// p(5) = 9
// p(6) = 11

// p(n) = p(n-1) + '#' (2n-1)

const pyramid = (n, o = n) => {
    if (n < 2) {
        const numSpaces = o - n;
        let level = '';
        for (let i=0; i < numSpaces; i++) {
            level += ' ';
        }
        level += '#';
        for (let i=0; i < numSpaces; i++) {
            level += ' ';
        }
        console.log(level);
        return;
    }

    pyramid(n-1, o);

    const hashCount = (n*2) - 1;
    const numSpaces = o - n;
    let level = '';
    for (let i=0; i < numSpaces; i++) {
        level += ' ';
    }
    for (let i=0; i < hashCount; i++) {
        level += '#';
    }
    for (let i=0; i < numSpaces; i++) {
        level += ' ';
    }
    console.log(level);
};

pyramid(10);

module.exports = pyramid;
