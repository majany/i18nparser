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

properties -> line:* statement
line -> statement "\n" {% nth(0) %}
statement -> assignment {% id %}
            | _ comment {% commentType %}
            | _ {% () => null %}

assignment -> key "=" transText comment:? {% assignmentType %}
comment -> "#" text {% d => d[0] + d[1] %}

_ -> wschar:* {% function(d) {return null;} %}
wschar -> [ \t] {% id %}
 
transText -> char transRest {% d => d[0] + d[1].join("") %}
transRest -> transChar:* {% id %}

transChar -> [^\n\t\v\f#] {% id %} # for translation text. may not contain #

text -> textChar:* {% d => d[0].join("") %} #for comments text. may contain spaces and tabs
textChar -> [^\n\v\f] {% id %}
key -> keychar:+ {% d => d[0].join("") %} # for key may not have spaces or whitespace
keychar -> [a-zA-Z0-9_] {% id %}
char -> [^\n\t\v\f ] {% id %}


