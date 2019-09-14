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


function assingmentdefType(d){
    return {
        lineType: "assignmentdef",
        type: d[1],
        length: d[2],
        text: d[4]
    }
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "assignmentdef$ebnf$1", "symbols": ["lenghtDef"], "postprocess": id},
    {"name": "assignmentdef$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "assignmentdef", "symbols": [{"literal":"#"}, "type", "assignmentdef$ebnf$1", {"literal":":"}, "text"], "postprocess": assingmentdefType},
    {"name": "lenghtDef", "symbols": [{"literal":","}, "_", "unsigned_int", "_"], "postprocess": nth(2)},
    {"name": "type$string$1", "symbols": [{"literal":"X"}, {"literal":"B"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$1"], "postprocess": id},
    {"name": "type$string$2", "symbols": [{"literal":"X"}, {"literal":"A"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$2"], "postprocess": id},
    {"name": "type$string$3", "symbols": [{"literal":"X"}, {"literal":"A"}, {"literal":"L"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$3"], "postprocess": id},
    {"name": "type$string$4", "symbols": [{"literal":"X"}, {"literal":"B"}, {"literal":"C"}, {"literal":"B"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$4"], "postprocess": id},
    {"name": "type$string$5", "symbols": [{"literal":"X"}, {"literal":"B"}, {"literal":"L"}, {"literal":"I"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$5"], "postprocess": id},
    {"name": "type$string$6", "symbols": [{"literal":"X"}, {"literal":"B"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$6"], "postprocess": id},
    {"name": "type$string$7", "symbols": [{"literal":"X"}, {"literal":"C"}, {"literal":"A"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$7"], "postprocess": id},
    {"name": "type$string$8", "symbols": [{"literal":"X"}, {"literal":"C"}, {"literal":"E"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$8"], "postprocess": id},
    {"name": "type$string$9", "symbols": [{"literal":"X"}, {"literal":"C"}, {"literal":"K"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$9"], "postprocess": id},
    {"name": "type$string$10", "symbols": [{"literal":"X"}, {"literal":"C"}, {"literal":"O"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$10"], "postprocess": id},
    {"name": "type$string$11", "symbols": [{"literal":"X"}, {"literal":"C"}, {"literal":"R"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$11"], "postprocess": id},
    {"name": "type$string$12", "symbols": [{"literal":"X"}, {"literal":"D"}, {"literal":"A"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$12"], "postprocess": id},
    {"name": "type$string$13", "symbols": [{"literal":"X"}, {"literal":"F"}, {"literal":"L"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$13"], "postprocess": id},
    {"name": "type$string$14", "symbols": [{"literal":"X"}, {"literal":"F"}, {"literal":"R"}, {"literal":"M"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$14"], "postprocess": id},
    {"name": "type$string$15", "symbols": [{"literal":"X"}, {"literal":"G"}, {"literal":"L"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$15"], "postprocess": id},
    {"name": "type$string$16", "symbols": [{"literal":"X"}, {"literal":"G"}, {"literal":"R"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$16"], "postprocess": id},
    {"name": "type$string$17", "symbols": [{"literal":"X"}, {"literal":"H"}, {"literal":"E"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$17"], "postprocess": id},
    {"name": "type$string$18", "symbols": [{"literal":"X"}, {"literal":"L"}, {"literal":"G"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$18"], "postprocess": id},
    {"name": "type$string$19", "symbols": [{"literal":"X"}, {"literal":"L"}, {"literal":"N"}, {"literal":"K"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$19"], "postprocess": id},
    {"name": "type$string$20", "symbols": [{"literal":"X"}, {"literal":"L"}, {"literal":"O"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$20"], "postprocess": id},
    {"name": "type$string$21", "symbols": [{"literal":"X"}, {"literal":"L"}, {"literal":"S"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$21"], "postprocess": id},
    {"name": "type$string$22", "symbols": [{"literal":"X"}, {"literal":"M"}, {"literal":"E"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$22"], "postprocess": id},
    {"name": "type$string$23", "symbols": [{"literal":"X"}, {"literal":"M"}, {"literal":"I"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$23"], "postprocess": id},
    {"name": "type$string$24", "symbols": [{"literal":"X"}, {"literal":"M"}, {"literal":"S"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$24"], "postprocess": id},
    {"name": "type$string$25", "symbols": [{"literal":"X"}, {"literal":"R"}, {"literal":"B"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$25"], "postprocess": id},
    {"name": "type$string$26", "symbols": [{"literal":"X"}, {"literal":"R"}, {"literal":"M"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$26"], "postprocess": id},
    {"name": "type$string$27", "symbols": [{"literal":"X"}, {"literal":"R"}, {"literal":"O"}, {"literal":"W"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$27"], "postprocess": id},
    {"name": "type$string$28", "symbols": [{"literal":"X"}, {"literal":"S"}, {"literal":"E"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$28"], "postprocess": id},
    {"name": "type$string$29", "symbols": [{"literal":"X"}, {"literal":"T"}, {"literal":"B"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$29"], "postprocess": id},
    {"name": "type$string$30", "symbols": [{"literal":"X"}, {"literal":"T"}, {"literal":"I"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$30"], "postprocess": id},
    {"name": "type$string$31", "symbols": [{"literal":"X"}, {"literal":"T"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$31"], "postprocess": id},
    {"name": "type$string$32", "symbols": [{"literal":"X"}, {"literal":"T"}, {"literal":"O"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$32"], "postprocess": id},
    {"name": "type$string$33", "symbols": [{"literal":"X"}, {"literal":"T"}, {"literal":"X"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$33"], "postprocess": id},
    {"name": "type$string$34", "symbols": [{"literal":"Y"}, {"literal":"A"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$34"], "postprocess": id},
    {"name": "type$string$35", "symbols": [{"literal":"Y"}, {"literal":"B"}, {"literal":"L"}, {"literal":"I"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$35"], "postprocess": id},
    {"name": "type$string$36", "symbols": [{"literal":"Y"}, {"literal":"D"}, {"literal":"E"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$36"], "postprocess": id},
    {"name": "type$string$37", "symbols": [{"literal":"Y"}, {"literal":"D"}, {"literal":"E"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$37"], "postprocess": id},
    {"name": "type$string$38", "symbols": [{"literal":"Y"}, {"literal":"E"}, {"literal":"X"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$38"], "postprocess": id},
    {"name": "type$string$39", "symbols": [{"literal":"Y"}, {"literal":"F"}, {"literal":"A"}, {"literal":"A"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$39"], "postprocess": id},
    {"name": "type$string$40", "symbols": [{"literal":"Y"}, {"literal":"F"}, {"literal":"A"}, {"literal":"Q"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$40"], "postprocess": id},
    {"name": "type$string$41", "symbols": [{"literal":"Y"}, {"literal":"G"}, {"literal":"L"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$41"], "postprocess": id},
    {"name": "type$string$42", "symbols": [{"literal":"Y"}, {"literal":"I"}, {"literal":"N"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$42"], "postprocess": id},
    {"name": "type$string$43", "symbols": [{"literal":"Y"}, {"literal":"I"}, {"literal":"N"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$43"], "postprocess": id},
    {"name": "type$string$44", "symbols": [{"literal":"Y"}, {"literal":"L"}, {"literal":"O"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$44"], "postprocess": id},
    {"name": "type$string$45", "symbols": [{"literal":"Y"}, {"literal":"M"}, {"literal":"S"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$45"], "postprocess": id},
    {"name": "type$string$46", "symbols": [{"literal":"Y"}, {"literal":"M"}, {"literal":"S"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$46"], "postprocess": id},
    {"name": "type$string$47", "symbols": [{"literal":"Y"}, {"literal":"M"}, {"literal":"S"}, {"literal":"I"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$47"], "postprocess": id},
    {"name": "type$string$48", "symbols": [{"literal":"Y"}, {"literal":"M"}, {"literal":"S"}, {"literal":"W"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$48"], "postprocess": id},
    {"name": "type$string$49", "symbols": [{"literal":"Y"}, {"literal":"T"}, {"literal":"E"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$49"], "postprocess": id},
    {"name": "type$string$50", "symbols": [{"literal":"Y"}, {"literal":"T"}, {"literal":"I"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$50"], "postprocess": id},
    {"name": "type$string$51", "symbols": [{"literal":"Y"}, {"literal":"T"}, {"literal":"X"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$51"], "postprocess": id},
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", "textChar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": ["text$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "textChar", "symbols": [/[^\r\n\v\f]/], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t]/], "postprocess": id}
]
  , ParserStart: "assignmentdef"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
