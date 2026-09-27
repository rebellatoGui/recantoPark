import { Fragment } from "react";

export function SplitWords({ text, attr = "data-word" }: { text: string; attr?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="inline-block" {...{ [attr]: "" }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
