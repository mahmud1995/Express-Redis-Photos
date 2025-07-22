// console.log("train new Promise and Promise.all");

// #region 🧩 new Promise
// TypeScript version with explicit types and debugging
// async function readAllFuncs(): Promise<string[]> {
//   console.log("🚀 Starting all tasks...");

//   try {
//     const results = await Promise.all([
//       walkDog(),
//       cleanKitchen(),
//       startRobot(),
//       throwTrash(),
//     ]);
//     console.log("✅ All mission is completed!");
//     console.log("📋 Results:", results);
//     return results;
//   } catch (error) {
//     console.log("❌ Error:", error);
//     throw error;
//   }
// }
// // Function - 1
// function walkDog(): Promise<string> {
//   console.log("🐕 Starting to walk the dog...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("🐕 Dog walk completed!");
//       resolve("You walked the Dog");
//     }, 2000);
//   });
// }
// // Function - 2
// function cleanKitchen(): Promise<string> {
//   console.log("🧽 Starting to clean kitchen...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("🧽 Kitchen cleaning completed!");
//       resolve("You cleaned the Kitchen");
//     }, 3000);
//   });
// }
// // Function - 3
// function startRobot(): Promise<string> {
//   console.log("🤖 Starting robot...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("🤖 Robot started!");
//       resolve("You started the Robot");
//     }, 500);
//   });
// }
// // Function - 4
// function throwTrash(): Promise<string> {
//   return new Promise((resolve) => {
//     const youCan = true;
//     setTimeout(() => {
//       if (youCan) {
//         console.log("You can throw the trash");
//         resolve("Succesfully threw out the trash");
//       } else {
//         console.log("It is not right time to throw out the Trash");
//       }
//     }, 500);
//   });
// }

// // Method 1: Using .then()
// console.log("=== Method 1: Using .then() ===");
// readAllFuncs()
//   .then((values) => {
//     console.log("🎉 All household chores are done!");
//     console.log("📝 Final results:", values);
//   })
//   .catch((error) => {
//     console.error("💥 Something went wrong:", error);
//   });

// Method 2: Using async/await (recommended for TypeScript)
// async function runChores() {
//   console.log("\n=== Method 2: Using async/await ===");
//   try {
//     const results = await readAllFuncs();
//     console.log("🎉 All household chores are done!");
//     console.log("📝 Final results:", results);
//   } catch (error) {
//     console.error("💥 Something went wrong:", error);
//   }
// }
// #endregion 🧩 new Promise

// #region Promise.allSettled
// console.log("TRAIN new Promise and Promise.allSettled\n");

// async function checkAllFuncs(): Promise<any> {
//   try {
//     const result = await Promise.allSettled([
//       myPromise1(),
//       myPromise2(),
//       myPromise3(),
//     ]);

//     console.log("Results from checkAllFuncs:", result);
//     return result;
//   } catch (error) {
//     console.log("Error:", error);
//     throw error;
//   }
// }

// // Create a Promise
// function myPromise1(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, "myPromise1 is ON");
//   });
// }

// // Create another Promise
// function myPromise2(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 1500, "myPromise2 is ON");
//   });
// }

// function myPromise3() {
//   return new Promise((resolve, reject) => {
//     let myProm = false;
//     if (myProm) {
//       resolve("myPromise3 is ON");
//     } else {
//       reject("NO myPromise3: myProm = false");
//     }
//   });
// }

// // Promise.allSettled

// Promise.allSettled([myPromise1(), myPromise2(), myPromise3()])
//   .then((results) => {
//     console.log("Direct Promise.allSettled results:", results);
//     // results.forEach((result, index) => {
//     //   if (result.status === "fulfilled") {
//     //     console.log(`Promise ${index + 1} fulfilled:`, result.value);
//     //   } else {
//     //     console.log(`Promise ${index + 1} rejected:`, result.reason);
//     //   }
//     // });
//   })
//   .catch((error) => {
//     console.log("error:", error);
//   });

// Test the async function
// checkAllFuncs().then((results) => {
//   console.log("Async function completed");
// });

// console.log("TRAIN new Promise and Promise.any\n");
// const promiseAny1 = new Promise((resolve))
// const promises = [promiseAny1, promiseAny2, promiseAny3];

// Promise.any(promises).then((value) => {
//   console.log("Direct Promise.allSettled results:", value);
// results.forEach((result, index) => {
//   if (result.status === "fulfilled") {
//     console.log(`Promise ${index + 1} fulfilled:`, result.value);
//   } else {
//     console.log(`Promise ${index + 1} rejected:`, result.reason);
//   }
// });
// });

/**
 * Create list of integer arrays
 * Iterate over another list called TheList
 * Filter out arrays whose first element (x[0]) equals 4
 * Returns a new list containing only those arrays
 * */

// function getThem(theList: number[][]): number[][] {
//   const list1: number[][] = [];
//   for (const x of theList) {
//     if (x[0] == 4) {
//       list1.push(x);
//     }
//   }
//   return list1;
// }

// const theList = [
//   [4, 3],
//   [3, 4],
//   [5, 4],
//   [4, 0],
// ];
// const result = getThem(theList);
// console.log("result:", result);

// function getThems(theLists: number[][]): number[][] {
//   const list2: number[][] = []; // closure
//   for (const x of theLists) {
//     if (x[1] == 3) {
//       list2.push(x);
//     }
//   }
//   return list2;
// }

// const theLists = [
//   [2, 3],
//   [3, 0],
//   [4, 3],
// ];
// const result1 = getThems(theLists);
// console.log("result1:", result1);

/**
 * getThem ==> getFlaggedCells
 * list2   ==> flaggedCells
 * x       ==> cells
 * theList ==> gameBoard
 *
 * */

// function getFlaggedCells(gameBoard: number[][]): number[][] {
//   const flaggedCells: number[][] = []; // Closure
//   for (const cells of gameBoard) {
//     if (cells[0] == 4) {
//       flaggedCells.push(cells);
//     }
//   }
//   return flaggedCells;
// }

// const gameBoard = [
//   [4, 3],
//   [3, 4],
//   [5, 4],
//   [4, 0],
// ];

// const resultOfGetFlaggedCells = getFlaggedCells(gameBoard);
// console.log("Result Of Get Flagged Cells:", resultOfGetFlaggedCells);

// class Cell {
//   flagged: boolean;

//   constructor(flagged: boolean) {
//     this.flagged = flagged;
//   }

//   isFlagged(): boolean {
//     return this.flagged;
//   }
// }

// function getFlaggedCells(gameBoard: Cell[]): Cell[] {
//   const flaggedCells: Cell[] = [];
//   for (const cell of gameBoard) {
//     if (cell.isFlagged()) {
//       flaggedCells.push(cell);
//     }
//   }
//   return flaggedCells;
// }

// const gameBoard = [
//   [4, 3],
//   [3, 4],
//   [5, 4],
//   [4, 0],
// ];
// // const result = getFlaggedCells(gameBoard);
// function greet(who: string) {
//   console.log("hellpo", who);
// }
// greet("ali");

// interface State {
//   name: string;
//   capital: string;
// }

// const states: State[] = [
//   { name: "Alabama", capital: "Montgomery" },
//   { name: "Alaska", capital: "Juneau" },
//   { name: "Arizona", capital: "Phoenix" },
//   // ...
// ];
// for (const state of states) {
//   console.log(state.capital);
// }

// const x: string = 2 + "3";
// console.log(x);

// function add(a: any, b: any): any {
//   return a + b;
// }
// const checkImplicit = add(10, null);
// console.log("checkImplicit", checkImplicit);

// const strctNulChek: number | null = null;

// interface Square {
//   kind: "square";
//   width: number;
// }
// interface Rectangle {
//   kind: "rectangle";
//   height: number;
//   width: number;
// }

// type Shape = Square | Rectangle;
// function calculateArea(shape: Shape) {
//   if (shape.kind === "rectangle") {
//     return shape.height * shape.width;
//   } else {
//     return shape.width / shape.width;
//   }
// }
// const exam: Shape = {
//   kind: "square",
//   //   height: 15,
//   width: 10,
// };
// const resultOfCalculateArea = calculateArea(exam);
// console.log("resultOfCalculateArea: ", resultOfCalculateArea);

/**
 * Common Messy Code Issues
 *
 */

// #region MESSY CODE-1
/** MESSY CODE **/

// console.log("MESSY CODE START!");
// export function fetchUserDataMessy(userId: number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("USERS Fetch");
//       fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         .then((response) => response.json())
//         .then((user) => {
//           console.log("POSTS Fetch");
//           fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
//             .then((response) => response.json())
//             .then((posts) => {
//               if (!posts.length) throw new Error("No posts found");
//               console.log("COMMENTS Fetch");
//               fetch(
//                 `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
//               )
//                 .then((response) => response.json())
//                 .then((comments) => {
//                   resolve({ user, posts, comments });
//                 })
//                 .catch((err) => console.log("Comments fetch error:", err));
//             })
//             .catch((err) => console.log("Posts fetch error:", err));
//         })
//         .catch((err) => console.log("User fetch error:", err));
//     }, 1000);
//   });
// }
// fetchUserDataMessy(1).then((value) => console.log(value));
// #endregion MESSY CODE

// #region CLEAN CODE-1
/** CLEAN CODE **/
console.log("CLEAN CODE START!");

interface User {
  id: string;
  name: string;
  email: string;
  address: {};
}
interface Post {
  id: string;
  userId: string;
  title: string;
}
interface Comment {
  id: string;
  postId: string;
  text: string;
}
interface UserData {
  user: User;
  posts: Post[];
  comments: Comment[];
}

// export async function fetchUserDataClean(userId: number): Promise<UserData> {
//   try {
//     console.log("Clean Code started to fetch Data!");
//     const [userResponse, postsResponse] = await Promise.all([
//       fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
//       fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
//     ]);

//     const [user, posts] = await Promise.all([
//       userResponse.json(),
//       postsResponse.json(),
//     ]);
//     /**
//      * const user = await userResponse.json()
//      * const post = await postResponse.json()
//      * BUT IT TAKES MORE TIME THEN PROMISE.ALL()
//      * */

//     const commentsResponse = await fetch(
//       `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
//       //https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}
//     );
//     const comments = await commentsResponse.json();

//     return { user, posts, comments };
//   } catch (error) {
//     console.log("Failed to fetch user data:", error);
//     throw new Error(`Unable to fetch data for user ${userId}`);
//   }
// }

export async function fetchUserDataClean(userId: number): Promise<UserData> {
  try {
    console.log("Clean Code started to fetch Data!");

    const [userResponse, postResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    const [user, posts] = await Promise.all([
      userResponse.json(),
      postResponse.json(),
    ]);
    /** SEPARATING commenResponse for ==>
     * More readable and sequential — it's clear that comments depend on posts[0].id
     * Avoids unnecessary request if posts is empty or missing
     */
    const commentResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
    );
    const comments = await commentResponse.json();

    return { user, posts, comments };
  } catch (error) {
    console.log("Failed to fetch data:", error);
    throw new Error(`Unable to fetch data for user ${userId}`);
  }
}
