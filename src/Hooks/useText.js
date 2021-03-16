import React from "react";
import Translate from "./../Lib/translate.json";
import berryEffect from "./../Lib/EffectsBerrys.json";

const useText = () => {
  const getText = React.useCallback((item) => {
    if (berryEffect[item]) {
      return berryEffect[item];
    } else {
      return "Não foi possível encontrar o efeito desse item.";
    }
  }, []);

  const textTransform = React.useCallback((text, transform) => {
    let textFinally = "";

    if (transform === "translate") {
      let textArray = text.split(" ");

      if (textArray.length > 1) {
        textFinally = textArray.map((text, i) => {
          const word = Translate[text.toLowerCase()];

          if (word) {
            if (i > 0) {
              return ` ${word}`;
            } else {
              return word;
            }
          } else {
            return ` ${text}`;
          }
        });
      } else {
        const word = Translate[textArray[0].toLowerCase()];

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

  return { textTransform, getText };
};

export default useText;
