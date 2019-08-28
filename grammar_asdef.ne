@builtin "postprocessors.ne"
@builtin "number.ne"
@{%
function assingmentdefType(d){
    return {
        lineType: "assignmentdef",
        type: d[1],
        length: d[2],
        text: d[4]
    }
}
%}

assignmentdef -> "#" type lenghtDef:? ":" text {% assingmentdefType %}
lenghtDef -> "," _  unsigned_int _ {% nth(2) %}
type -> "XBUT" {% id %} 
     | "XFLD" {% id %}

text -> textChar:* {% d => d[0].join("") %} #for comments text. may contain spaces and tabs
textChar -> [^\n\v\f] {% id %}

_ -> wschar:* {% function(d) {return null;} %}
wschar -> [ \t] {% id %}
 
