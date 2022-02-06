var tagcolor = "#06b6d4";
var attributecolor = "#06b6d4";
var tagnamecolor = "#2563eb";
var attributevaluecolor = "#fb923c";

export const w3CodeColor = (element: HTMLElement) => {
  var elmntTxt = element.innerHTML;

  elmntTxt = htmlMode(elmntTxt);
  element.innerHTML = elmntTxt;

  function htmlMode(txt: string) {
    var rest = txt,
      done = "",
      startpos,
      endpos,
      note;

    while (rest.indexOf("&lt;") > -1) {
      note = "";

      startpos = rest.indexOf("&lt;");
      endpos = rest.indexOf("&gt;", startpos);
      if (endpos == -1) {
        endpos = rest.length;
      }
      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);
    }
    rest = done + rest;

    return rest;
  }

  function tagMode(txt: string) {
    var rest = txt,
      done = "",
      startpos,
      endpos,
      result;
    while (rest.search(/(\s)/) > -1) {
      startpos = rest.search(/(\s)/);
      endpos = rest.indexOf("&gt;");
      if (endpos == -1) {
        endpos = rest.length;
      }
      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }
    result = done + rest;
    result =
      "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
    if (result.substr(result.length - 4, 4) == "&gt;") {
      result =
        result.substring(0, result.length - 4) +
        "<span style=color:" +
        tagcolor +
        ">&gt;</span>";
    }

    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }
  function attributeMode(txt: string) {
    var rest = txt,
      done = "",
      startpos,
      endpos,
      singlefnuttpos,
      doublefnuttpos,
      spacepos;
    while (rest.indexOf("=") > -1) {
      endpos = -1;
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);
      if (
        spacepos > -1 &&
        (spacepos < singlefnuttpos || singlefnuttpos == -1) &&
        (spacepos < doublefnuttpos || doublefnuttpos == -1)
      ) {
        endpos = rest.indexOf(" ", startpos);
      } else if (
        doublefnuttpos > -1 &&
        (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) &&
        (doublefnuttpos < spacepos || spacepos == -1)
      ) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if (
        singlefnuttpos > -1 &&
        (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) &&
        (singlefnuttpos < spacepos || spacepos == -1)
      ) {
        endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
      }
      if (!endpos || endpos == -1 || endpos < startpos) {
        endpos = rest.length;
      }
      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));
      rest = rest.substr(endpos + 1);
    }

    return (
      "<span style=color:" + attributecolor + ">" + done + rest + "</span>"
    );
  }
  function attributeValueMode(txt: string) {
    return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
  }
};
