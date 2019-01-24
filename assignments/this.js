/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window binding - when the this reference is in the global scope it will bind to the window object.
* 2. Implicit binding - when a function is called using dot notation this binds to the object the dot references.
* 3. New binding - when the 'new' key word is used this binds to the instance created by the call.
* 4. Explicit binding - when a function is called using .call() or .apply() this is passed to the function as an argument to the .call or .apply(). If the function needs to be called later, such as events, .bind() can be used to the same effect.
*
* write out a code example of each explanation above
*/

// Principle 1
// code example for Window Binding
function windowBinding() {
    return this;
}

console.log(windowBinding());

// Principle 2
// code example for Implicit Binding
const obj = {
    name: "barry",
    hiBarry: function() {
        return this.name;
    }
};

console.log(obj.hiBarry());

// Principle 3
// code example for New Binding
function NewBinding (name, other) {
    this.name = name;
    this.other = other;
}

const example = new NewBinding('example', 'other');
console.log(example);

// Principle 4
// code example for Explicit Binding
function explicitBinding () {
    return this;
}

const thing = explicitBinding.call('here is this');
console.log(thing);
