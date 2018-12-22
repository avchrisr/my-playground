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

const mapping = new Map();
mapping.set(1, 'a');
mapping.set(2, 'b');
mapping.set(3, 'c');
mapping.set(4, 'd');
mapping.set(5, 'e');
mapping.set(6, 'f');
mapping.set(7, 'g');
mapping.set(8, 'h');
mapping.set(9, 'i');
mapping.set(10, 'j');
mapping.set(11, 'k');
mapping.set(12, 'l');
mapping.set(13, 'n');
mapping.set(14, 'm');
mapping.set(15, 'o');
mapping.set(16, 'p');
mapping.set(17, 'q');
mapping.set(18, 'r');
mapping.set(19, 's');
mapping.set(20, 't');
mapping.set(21, 'u');
mapping.set(22, 'v');
mapping.set(23, 'w');
mapping.set(24, 'x');
mapping.set(25, 'y');
mapping.set(26, 'z');

// console.log(mapping);

const numDecodedMessages = [];

const decodeMessage = (encodedMessage: string, decodedMsg: string = '') => {
    if (encodedMessage.length > 0) {
        const singleDigit: number = parseInt(encodedMessage[0]);

        console.log(`singleDigit = ${singleDigit}`);

        if (singleDigit > 0) {
            // decodedMsg += mapping.get(singleDigit);
            console.log(`decodedMsg SINGLE = ${decodedMsg}`);

        } else {
            console.log(`decodedMsg SINGLE FINAL = ${decodedMsg}`);
            numDecodedMessages.push(decodedMsg);
            // decodedMsg = `${singleDigit}`;
            decodedMsg = mapping.get(singleDigit);
        }

        decodeMessage(encodedMessage.substring(1), decodedMsg + mapping.get(singleDigit));

    } else {
        console.log(`decodedMsg SINGLE FINAL 2 = ${decodedMsg}`);
        numDecodedMessages.push(decodedMsg);
    }
    
    if (encodedMessage.length > 1) {
        const doubleDigit: number = parseInt(encodedMessage.substring(0, 2));
   
        console.log(`doubleDigit = ${doubleDigit}`);
   
        if (doubleDigit >= 10 && doubleDigit <= 26) {
            // decodedMsg += mapping.get(doubleDigit);
            console.log(`counter DOUBLE = ${decodedMsg}`);

        } else {
            console.log(`counter DOUBLE FINAL = ${decodedMsg}`);
            numDecodedMessages.push(decodedMsg);
            // decodedMsg = `${doubleDigit}`;
            decodedMsg = mapping.get(doubleDigit);
        }

        decodeMessage(encodedMessage.substring(2), decodedMsg + mapping.get(doubleDigit));
    }
};

const input: string = `11125234`;

decodeMessage(input);

console.log(`numDecodedMessages.length = ${numDecodedMessages.length}`);
console.log(numDecodedMessages);

export {};
