// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function nth(n) {
    return function(d) {
        return d[n];
    };
}


// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}


function commentType(d){
    return {
        type: "comment",
        text: d[1]
    }
}
function assignmentType(d){
    return {
        type: "assignment",
        key: d[0],
        text: d[2]
    }
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "properties$ebnf$1", "symbols": []},
    {"name": "properties$ebnf$1$subexpression$1", "symbols": ["statement", {"literal":"\n"}]},
    {"name": "properties$ebnf$1", "symbols": ["properties$ebnf$1", "properties$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "properties", "symbols": ["properties$ebnf$1", "statement"]},
    {"name": "statement", "symbols": ["assignment"]},
    {"name": "statement", "symbols": ["_", "comment"], "postprocess": commentType},
    {"name": "statement", "symbols": ["_"], "postprocess": () => null},
    {"name": "assignment$ebnf$1", "symbols": ["comment"], "postprocess": id},
    {"name": "assignment$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "assignment", "symbols": ["word", {"literal":"="}, "transText", "assignment$ebnf$1"], "postprocess": assignmentType},
    {"name": "comment", "symbols": [{"literal":"#"}, "text"], "postprocess": d => d[0] + d[1].join("")},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\v\f]/], "postprocess": id},
    {"name": "transText", "symbols": ["transChar", "transRest"], "postprocess": d => d[0] + d[1].join("")},
    {"name": "transRest$ebnf$1", "symbols": []},
    {"name": "transRest$ebnf$1", "symbols": ["transRest$ebnf$1", "transChar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "transRest", "symbols": ["transRest$ebnf$1"], "postprocess": id},
    {"name": "transChar", "symbols": [/[^\n\t\v\f#]/], "postprocess": id},
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", "textChar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": ["text$ebnf$1"], "postprocess": id},
    {"name": "textChar", "symbols": [/[^\n\v\f]/], "postprocess": id},
    {"name": "word$ebnf$1", "symbols": ["char"]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", "char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "word", "symbols": ["word$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "char", "symbols": [/[^\n\t\v\f ]/], "postprocess": id}
]
  , ParserStart: "properties"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
