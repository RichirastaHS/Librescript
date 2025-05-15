const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed("");

try{
    console.log("Resultado: ", parser.results)
}catch(e){
    console.log("Error: ", e.message)
}

