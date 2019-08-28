@builtin "postprocessors.ne"
@builtin "number.ne"
@{%
function commentType(d){
    return {
        lineType: "comment",
        text: d[1]
    }
}
function assignmentType(d){
    return {
        lineType: "assignment",
        key: d[0],
        text: d[2]
    }
}
function assingmentdefType(d){
    return {
        lineType: "assignmentdef",
        type: d[1],
        length: d[2],
        text: d[4]
    }
}
%}

properties -> (statement "\n"):* statement
statement -> assignment {% id %}
           | assignmentdef {% id %}
            | _ comment {% commentType %}
            | _ {% () => null %}

assignment -> key "=" transText comment:? {% assignmentType %}
assignmentdef -> "#" type lenghtDef:? ":" text {% assingmentdefType %}
lenghtDef -> "," _  unsigned_int _ {% nth(2) %}

comment -> "#" text {% d => d[0] + d[1] %}

_ -> wschar:* {% function(d) {return null;} %}
wschar -> [ \t] {% id %}
 
transText -> transChar transRest {% d => d[0] + d[1].join("") %}
transRest -> transChar:* {% id %}

transChar -> [^\n\t\v\f#] {% id %} # for translation text. may not contain #

text -> textChar:* {% d => d[0].join("") %} #for comments text. may contain spaces and tabs
textChar -> [^\n\v\f] {% id %}
key -> char:+ {% d => d[0].join("") %} # for key may not have spaces or whitespace
char -> [^\n\t\v\f ] {% id %}

type -> "XBUT" | "XFLD"
