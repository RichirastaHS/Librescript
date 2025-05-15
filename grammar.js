// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

const lexer = moo.compile({
  ws:        { match: /[ \t]+/, lineBreaks: false,},
  newline:   { match: /\r?\n/, lineBreaks: true, },
  assign:    '=',
  colon:     ':',
  semi:      ';',
  lparen:    '(',
  rparen:    ')',
  lbrace:    '{',
  rbrace:    '}',
  mayorq:    '>',
  menorq:    '<',
  igual:	 '==',
  mult: 	 '*',
  divicion:  '/',
  mas:		 '+',
menos:		 '-',
 // Tipos
  tipo:      ['numero', 'texto', 'booleano'],
  // Literales
  booleano:  ['verdadero', 'falso'],
  number:    /[0-9]+/,
  string:    /"(?:[^"\\]|\\.)*"/,

  // Variables que comienzan con $
  variable:  /\$[a-zA-Z_][a-zA-Z0-9_]*/,
	
  identifier: {
    match: /[a-zA-Z_][a-zA-Z0-9_]*/,
    type: moo.keywords({
      // Palabras clave de control
      kw_if:       'if',
      kw_else:     'else',
      kw_for:      'for',
      kw_while:    'while',
      
  })
  },
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": ["statement"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": ([stmts]) => stmts.flat()},
    {"name": "statement", "symbols": ["declaration"], "postprocess": id},
    {"name": "statement", "symbols": ["usage", (lexer.has("semi") ? {type: "semi"} : semi)], "postprocess": id},
    {"name": "statement", "symbols": ["control_statement"]},
    {"name": "statement", "symbols": ["bucle_statement"]},
    {"name": "statement", "symbols": ["bucle_while"]},
    {"name": "declaration", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable), (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("tipo") ? {type: "tipo"} : tipo), (lexer.has("assign") ? {type: "assign"} : assign), "value", (lexer.has("semi") ? {type: "semi"} : semi)], "postprocess": ([v, , tipo, , val]) => ({ tipo: 'declaracion', nombre: v.value, tipoDato: tipo.value, valor: val })},
    {"name": "usage", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": ([v]) => ({ tipo: 'uso', nombre: v.value })},
    {"name": "value", "symbols": ["expr"]},
    {"name": "value", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([s]) => s.value.slice(1, -1)},
    {"name": "value", "symbols": [(lexer.has("booleano") ? {type: "booleano"} : booleano)], "postprocess": ([b]) => b.value === 'verdadero'},
    {"name": "control_statement", "symbols": [(lexer.has("kw_if") ? {type: "kw_if"} : kw_if), (lexer.has("lparen") ? {type: "lparen"} : lparen), "condicion", (lexer.has("rparen") ? {type: "rparen"} : rparen), "block"], "postprocess": ([, , cond]) => ({ tipo: "if", condicion: cond })},
    {"name": "bucle_statement", "symbols": [(lexer.has("kw_for") ? {type: "kw_for"} : kw_for), (lexer.has("lparen") ? {type: "lparen"} : lparen), "condicion", (lexer.has("rparen") ? {type: "rparen"} : rparen), "block"], "postprocess": ([, , cond]) => ({ tipo: "for", condicion: cond.value })},
    {"name": "bucle_while", "symbols": [(lexer.has("kw_while") ? {type: "kw_while"} : kw_while), (lexer.has("lparen") ? {type: "lparen"} : lparen), "condicion", (lexer.has("rparen") ? {type: "rparen"} : rparen), "block"], "postprocess": ([, , cond]) => ({ tipo: "while", condicion: cond.value })},
    {"name": "condicion", "symbols": [(lexer.has("booleano") ? {type: "booleano"} : booleano)]},
    {"name": "condicion", "symbols": ["expr"]},
    {"name": "block", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "statement", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": ([, stmts]) => stmts},
    {"name": "expr", "symbols": ["term"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("mas") ? {type: "mas"} : mas), "term"], "postprocess": ([a, , b]) => ({ tipo: 'suma', izq: a, der: b })},
    {"name": "expr", "symbols": ["expr", (lexer.has("menos") ? {type: "menos"} : menos), "term"], "postprocess": ([a, , b]) => ({ tipo: 'resta', izq: a, der: b })},
    {"name": "term", "symbols": ["factor"]},
    {"name": "term", "symbols": ["term", (lexer.has("mult") ? {type: "mult"} : mult), "factor"], "postprocess": ([a, , b]) => ({ tipo: 'multiplicacion', izq: a, der: b })},
    {"name": "term", "symbols": ["term", (lexer.has("divicion") ? {type: "divicion"} : divicion), "factor"], "postprocess": ([a, , b]) => ({ tipo: 'division', izq: a, der: b })},
    {"name": "factor", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": ([n]) => Number(n.value)},
    {"name": "factor", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": ([v]) => ({ tipo: 'variable', nombre: v.value })},
    {"name": "factor", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expr", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": ([, e]) => e},
    {"name": "condicion", "symbols": ["expr", "operador_comp", "expr"], "postprocess": ([a, op, b]) => ({ tipo: 'comparacion', op: op.type, izq: a, der: b })},
    {"name": "operador_comp", "symbols": [(lexer.has("mayorq") ? {type: "mayorq"} : mayorq)]},
    {"name": "operador_comp", "symbols": [(lexer.has("menorq") ? {type: "menorq"} : menorq)]},
    {"name": "operador_comp", "symbols": [(lexer.has("igual") ? {type: "igual"} : igual)]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
