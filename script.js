
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "classroom";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  classroom: {
    title: "The Classroom",
    character: "Lily",
    text: "Lily cannot find her phone. She remembers using it in class before lunch. Help Lily look for clues.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
  {
    text: "Check Lily's desk",
    nextScene: "desk"
  },
  {
    text: "Check the teacher's desk",
    nextScene: "teacherDesk"
  }
]
},
  desk: {
  title: "Lily's Desk",
  character: "Lily",
  text: "Lily looks under her desk and finds a small note. The note says to check the library.",
  choices: [
    {
  text: "Pick up the note",
  action: function () {
    if (!inventory.includes("note")) {
      pickUpItem("note");
    }
  },
  nextScene: "classroom"
},
    {
      text: "Go back to the classroom",
      nextScene: "classroom"
    }
  ]
},
teacherDesk: {
  title: "Teacher's Desk",
  character: "Mr. Lee",
  text: "Lily asks Mr. Lee about her missing phone. Mr. Lee remembers seeing Lily near the library before lunch.",
  choices: [
    {
  text: "Go to the library",
  action: function () {
    updateHealth(-10);
  },
  nextScene: "library"
},
    {
      text: "Go back to the classroom",
      nextScene: "classroom"
    }
  ]
},
library: {
  title: "The Library",
  character: "Emma",
  text: "Lily and Emma look around the library. Emma remembers seeing Jack near the cafeteria. Maybe Jack knows something about the missing phone.",
  choices: [
    {
      text: "Go to the cafeteria",
      nextScene: "cafeteria"
    },
    {
      text: "Go back to the classroom",
      nextScene: "classroom"
    }
  ]
},

cafeteria: {
  title: "The Cafeteria",
  character: "Jack",
  text: "Lily and Emma find Jack in the cafeteria. Jack says he saw Lily put her phone on a table during lunch. He thinks someone may have taken it to the school office.",
  choices: [
    {
      text: "Go to the school office",
      nextScene: "office"
    },
    {
      text: "Go back to the library",
      nextScene: "library"
    }
  ]
},

office: {
  title: "The School Office",
  character: "Lily",
  text: "Lily and Emma go to the school office. The staff says someone found a phone in the cafeteria. Lily sees a phone that looks like hers.",
  choices: [
   {
  text: "Check the phone",
  action: function () {
    checkPhone();
  }
},
    {
      text: "Go back to the cafeteria",
      nextScene: "cafeteria"
    }
  ]
},

foundPhone: {
  title: "Phone Found!",
  character: "Lily",
  text: "Lily checks the phone and sees her favorite wallpaper. It is her phone! She is very happy and thanks Emma and Jack for helping her. The mystery is solved!",
  choices: [
    {
  text: "Play Again",
  action: function () {
    inventory = [];
    inventoryDisplay.textContent = "";
    health = 100;
    healthDisplay.textContent = health;
    messageDisplay.textContent = "";
    updateScene("classroom");
  }
}
  ]
}
};

  
// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");
const messageDisplay = document.getElementById("message-display");
// Then, we create a function to update the scene,
function updateScene(sceneName) {
  messageDisplay.textContent = "";

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene



// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function checkPhone() {
  if (inventory.includes("note")) {
    updateScene("foundPhone");
  } else {
    messageDisplay.textContent = "You need to find the note in the classroom first!";
  }
}
updateScene(currentScene);
