console.log("train new Promise and Promise.all");
// TypeScript version with explicit types and debugging
async function readAllFuncs(): Promise<string[]> {
  console.log("🚀 Starting all tasks...");

  try {
    const results = await Promise.all([
      walkDog(),
      cleanKitchen(),
      startRobot(),
      throwTrash(),
    ]);
    console.log("✅ All mission is completed!");
    console.log("📋 Results:", results);
    return results;
  } catch (error) {
    console.log("❌ Error:", error);
    throw error;
  }
}
// Function - 1
function walkDog(): Promise<string> {
  console.log("🐕 Starting to walk the dog...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🐕 Dog walk completed!");
      resolve("You walked the Dog");
    }, 2000);
  });
}
// Function - 2
function cleanKitchen(): Promise<string> {
  console.log("🧽 Starting to clean kitchen...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🧽 Kitchen cleaning completed!");
      resolve("You cleaned the Kitchen");
    }, 3000);
  });
}
// Function - 3
function startRobot(): Promise<string> {
  console.log("🤖 Starting robot...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🤖 Robot started!");
      resolve("You started the Robot");
    }, 500);
  });
}
// Function - 4
function throwTrash(): Promise<string> {
  return new Promise((resolve) => {
    const youCan = true;
    setTimeout(() => {
      if (youCan) {
        console.log("You can throw the trash");
        resolve("Succesfully threw out the trash");
      } else {
        console.log("It is not right time to throw out the Trash");
      }
    }, 500);
  });
}

// readAllFuncs().then(() => console.log("All household chores are done!"));

// Method 1: Using .then()
console.log("=== Method 1: Using .then() ===");
readAllFuncs()
  .then((values) => {
    console.log("🎉 All household chores are done!");
    console.log("📝 Final results:", values);
  })
  .catch((error) => {
    console.error("💥 Something went wrong:", error);
  });

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

console.log("train new Promise and Promise.allSettled");
