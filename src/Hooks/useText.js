import React from "react";
import Translate from "./../Lib/translate.json";

const useText = () => {
  const textTransform = React.useCallback((text, transform) => {
    let textFinally = "";

    if (transform === "translate") {
      let textArray = text.split(" ");

      if (textArray > 1) {
        textFinally = textArray.reduce((before, after) => {
          const word = Translate[after];

          if (word) {
            return (before += word);
          } else {
            return (before += after + " ");
          }
        });
      } else {
        const word = Translate[textArray[0]];

        if (word) {
          textFinally = word;
        } else {
          textFinally = textArray[0];
        }
      }
    } else if (transform === "replace") {
      if (text && text.indexOf("-") > 0) {
        textFinally = text.replace(/-/g, " ");
      } else if (text && text.indexOf(" ") > 0) {
        textFinally = textFinally = text.replace(/ /g, "-");
      } else {
        textFinally = text;
      }
    }

    return textFinally;
  }, []);

  return { textTransform };
};

export default useText;
