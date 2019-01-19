/*
This problem was asked by Google.

The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

(i.e.) PowerSet  ==  all subsets of a set

For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.  <--  2^N

You may also use a list or array to represent a set.
*/

/*
To generate the power set, observe how you create a subset : you go to each element one by one, and then either retain it or ignore it.
A subset if formed by including some or all of the elements of the original set.
Thus, to create a subset, you go to each element, and then decide whether to keep it or drop it.
This means that for each element, you have 2 decisions. Thus, for a set, you can end up with 2^N different decisions, corresponding to 2^N different subsets.
*/

/* HINT

Pseudo-code:

val set = {"A", "B", "C"}
val sets = {}

for item in set:
  for set in sets:
    sets.add(set + item)
  sets.add({item})
sets.add({})

-------------------------------------------

Algorithm explanation:

1) Initialise sets to an empty set: {}.
2) Iterate over each item in {"A", "B", "C"}
3) Iterate over each set in your sets.
3.1) Create a new set which is a copy of set.
3.2) Append the item to the new set.
3.3) Append the new set to sets.
4) Add the item to your sets.
4) Iteration is complete. Add the empty set to your resultSets.

-------------------------------------------

Walkthrough:

Let's look at the contents of sets after each iteration:

Iteration 1, item = "A":
sets = {{"A"}}

Iteration 2, item = "B":
sets = {{"A"}, {"A", "B"}, {"B"}}

Iteration 3, item = "C":
sets = {{"A"}, {"A", "B"}, {"B"}, {"A", "C"}, {"A", "B", "C"}, {"B", "C"}, {"C"}}

Iteration complete, add empty set:
sets = {{"A"}, {"A", "B"}, {"B"}, {"A", "C"}, {"A", "B", "C"}, {"B", "C"}, {"C"}, {}}

The size of the sets is 2^|set| = 2^3 = 8 which is correct.
*/

// SOLUTION
// start by creating an empty set or array to store the output
// iterate through each item in the given set
// loop over each set in the output set/array, and append the currently iterating item to it
// add an empty set once all iterations are complete
// results = 2^N subsets, including the empty set


const findPowerSet = (nums: Set<number>): any[] => {
    const output = [];

    nums.forEach((num: number) => {
        output.forEach((set: number[]) => {
            const newSet = JSON.parse(JSON.stringify(set));
            newSet.push(num);
            output.push(newSet);
        });

        // lastly add that number itself to the output as a set
        output.push([num]);
    });

    // add an empty set
    output.push([]);

    return output;
};

const input = new Set();

input.add(1);
input.add(2);
input.add(3);

const result = findPowerSet(input);

console.log(result);
console.log(`total number of subsets = ${result.length}`);

export {};
