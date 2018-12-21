/*
This problem was asked by Facebook.
Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
You can assume that the messages are decodable. For example, '001' is not allowed.
*/

// it's either single digit or double digits for each traversal.
// create a counter

// Depth-first search
// time complexity: O(n^2)
// space complexity: counter. O(1)

const decodeMessage = (encodedMessage: string, counter: number = 0) => {
    if (encodedMessage.length > 0) {
        const singleDigit: number = parseInt(encodedMessage[0]);

        console.log(`singleDigit = ${singleDigit}`);

        if (singleDigit > 0) {
            counter += 1;
            decodeMessage(encodedMessage.substring(1), counter);
        }
    }
    
    if (encodedMessage.length > 1) {
        const doubleDigit: number = parseInt(encodedMessage.substring(0, 2));
   
        console.log(`doubleDigit = ${doubleDigit}`);

   
        if (doubleDigit >= 10 && doubleDigit <= 26) {
            counter += 1;
            decodeMessage(encodedMessage.substring(2), counter);
        }
    }

    return counter;
};

const input: string = `111`;

console.log(decodeMessage(input));



export {};
