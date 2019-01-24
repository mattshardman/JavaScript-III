/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
function GameObject(assignments) {
  this.createdAt = assignments.createdAt;
  this.dimensions = assignments.dimensions;
}

GameObject.prototype.destroy = function() {
  console.log(`${this.name} was removed from the game`);
  return `${this.name} was removed from the game`;
};

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(assignments) {
  GameObject.call(this, assignments);
  this.healthPoints = assignments.healthPoints;
  this.name = assignments.name;
}

CharacterStats.prototype = { ...GameObject.prototype };

CharacterStats.prototype.takeDamage = function(power) {
  this.healthPoints -= power;
  return `${this.name} took damage`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(assignments) {
  CharacterStats.call(this, assignments);
  this.team = assignments.team;
  this.weapons = assignments.weapons;
  this.language = assignments.language;
}

Humanoid.prototype = { ...CharacterStats.prototype };

Humanoid.prototype.greet = function() {
  return `${this.name}, of ${this.team} team, offers a greeting in ${this.language}.`;
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

// console.log(mage.createdAt); // Today's date
// console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
// console.log(swordsman.healthPoints); // 15
// console.log(mage.name); // Bruce
// console.log(swordsman.team); // The Round Table
// console.log(mage.weapons); // Staff of Shamalama
// console.log(archer.language); // Elvish
// console.log(archer.greet()); // Lilith offers a greeting in Elvish.
// console.log(mage.takeDamage()); // Bruce took damage.
// console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

// attack method
function attack (opponent, weapon) {
  opponent.takeDamage(weapon.power);
  return `${this.name} attacks with ${weapon.name}\n${opponent.name}'s health: ${opponent.healthPoints}`;
};

// villain constructor function
function Villain(assignments) {
  Humanoid.call(this, assignments);
}

Villain.prototype = { ...Humanoid.prototype, attack };

// hero constructor function
function Hero(assignments) {
  Humanoid.call(this, assignments);
}

Hero.prototype = { ...Humanoid.prototype, attack };

// generate random number
const randNum = (num) => Math.floor(Math.random() * Math.floor(num));

// hero vs villain fight function
function createCharactersAndFight(villainObj, heroObj) {
  // create new hero and new villain with objects passed into fight function
  const hero = new Hero(heroObj);
  const villain = new Villain(villainObj);

  // fighters greet each other
  console.log(hero.greet());
  console.log(villain.greet());
  
  //fight function 
  function fight() {

    // if both character have health above 0 a fight begins
    if (hero.healthPoints > 0 && villain.healthPoints > 0) {
      // a random number decides who attacks
      if (randNum(2)) {
        const choice = randNum(hero.weapons.length);
        // the character attacks with a random weapon from their weapons array, each weapon has a set power
        console.log(hero.attack(villain, hero.weapons[choice]));
      } else {
        const choice = randNum(villain.weapons.length);
        console.log(villain.attack(hero, villain.weapons[choice]));
      }
      // the function recursively calls itself until one character is dead
      return setTimeout(() => fight(), 2000);
    }
  
    // calls the destroy function on the looser
    if (hero.healthPoints <= 0) {
      hero.destroy();
    } else {
      villain.destroy();
    }
    
    return `Fight over`;
  };

  // fight commences 2 seconds after characters greet each other
  this.setTimeout(() => fight(), 2000);
};

// create objects for villain and hero
const villainObj = {
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 20,
  name: "Lawrence",
  team: "Forest Kingdom",
  weapons: [
    { name: "a punch", power: 1 },
    { name: "a wad of cash", power: 2 },
    { name: "a wet fish", power: 1 },
  ],
  language: "Elvish"
};

const heroObj = {
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 20,
  name: "Matt",
  team: "The Round Table",
  weapons: [
    { name: "a plastic Sword", power: 2 },
    { name: "a huge punch to the face which misses", power: 0 },
    { name: "a kick move", power: 1 },
  ],
  language: "Common Tongue"
};

// call fight function with villain and hero objects
createCharactersAndFight(villainObj, heroObj);
