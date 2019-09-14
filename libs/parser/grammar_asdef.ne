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
    | "XACT"  {% id %} 
    | "XALT"  {% id %} 
    | "XBCB"  {% id %} 
    | "XBLI"  {% id %} 
    | "XBUT"  {% id %} 
    | "XCAP"  {% id %} 
    | "XCEL"  {% id %} 
    | "XCKL"  {% id %} 
    | "XCOL"  {% id %} 
    | "XCRD"  {% id %} 
    | "XDAT"  {% id %} 
    | "XFLD"  {% id %} 
    | "XFRM"  {% id %} 
    | "XGLS"  {% id %} 
    | "XGRP"  {% id %} 
    | "XHED"  {% id %} 
    | "XLGD"  {% id %} 
    | "XLNK"  {% id %} 
    | "XLOG"  {% id %} 
    | "XLST"  {% id %} 
    | "XMEN"  {% id %} 
    | "XMIT"  {% id %} 
    | "XMSG"  {% id %} 
    | "XRBL"  {% id %} 
    | "XRMP"  {% id %} 
    | "XROW"  {% id %} 
    | "XSEL"  {% id %} 
    | "XTBS"  {% id %} 
    | "XTIT"  {% id %} 
    | "XTND"  {% id %} 
    | "XTOL"  {% id %} 
    | "XTXT"  {% id %} 
    | "YACT"  {% id %} 
    | "YBLI"  {% id %} 
    | "YDEF"  {% id %} 
    | "YDES"  {% id %} 
    | "YEXP"  {% id %} 
    | "YFAA"  {% id %} 
    | "YFAQ"  {% id %} 
    | "YGLS"  {% id %} 
    | "YINF"  {% id %} 
    | "YINS"  {% id %} 
    | "YLOG"  {% id %} 
    | "YMSE"  {% id %} 
    | "YMSG"  {% id %} 
    | "YMSI"  {% id %} 
    | "YMSW"  {% id %} 
    | "YTEC"  {% id %} 
    | "YTIC"  {% id %} 
    | "YTXT"  {% id %} 

text -> textChar:* {% d => d[0].join("") %} #for comments text. may contain spaces and tabs
textChar -> [^\r\n\v\f] {% id %}

_ -> wschar:* {% function(d) {return null;} %}
wschar -> [ \t] {% id %}
 
