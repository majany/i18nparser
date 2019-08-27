@builtin "postprocessors.ne"
@{%
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
%}

properties -> (statement "\n"):* statement 
statement -> assignment 
            | _ comment {% commentType %}
            | _ {% () => null %}

assignment -> word "=" transText comment:? {% assignmentType %}
comment -> "#" text {% d => d[0] + d[1].join("") %}

_ -> wschar:* {% function(d) {return null;} %}
wschar -> [ \t\v\f] {% id %}
 
transText -> transChar transRest {% d => d[0] + d[1].join("") %}
transRest -> transChar:* {% id %}

transChar -> [^\n\t\v\f#] {% id %} # for translation text. may not contain #

text -> textChar:* {% id %} #for comments text. may contain spaces and tabs
textChar -> [^\n\v\f] {% id %}
word -> char:+ {% d => d[0].join("") %} # for key may not have spaces or whitespace
char -> [^\n\t\v\f ] {% id %}