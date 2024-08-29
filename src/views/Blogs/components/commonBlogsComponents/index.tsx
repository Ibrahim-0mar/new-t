export const divWithParagraphs = (paragraphs: (string | JSX.Element)[]) => {
  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export const headingsWithParagraphs = (
  items:
    | { head?: string; paragraph: string | JSX.Element }[]
    | { head: string; paragraph?: string | JSX.Element }[],
  intro?: string | JSX.Element,
  end?: string | JSX.Element,
) => {
  return (
    <div className="flex flex-col gap-2">
      {intro}
      {items.map((i, index) => (
        <p className="text-sm" key={index}>
          <span className="text-xl font-semibold">{i.head}</span> {i.paragraph}
        </p>
      ))}
      {end}
    </div>
  );
};

export const customList = (
  type: 'ol' | 'ul',
  items: { head: string | JSX.Element; paragraph?: string | JSX.Element }[],
  olStart?: number,
) => {
  const listBody = items.map((i, index) => (
    <li key={index}>
      <span className={i.paragraph && 'font-semibold'}>{i.head}</span>
      {i.paragraph ? <div className="ps-6">{i.paragraph}</div> : null}
    </li>
  ));

  switch (type) {
    case 'ol':
      return (
        <ol className="flex list-inside list-decimal flex-col gap-4 ps-4" start={olStart}>
          {listBody}
        </ol>
      );
    case 'ul':
      return <ul className="flex list-inside list-disc flex-col gap-2 ps-4">{listBody}</ul>;
    default:
      return <ul className="flex list-inside list-disc flex-col gap-2 ps-4">{listBody}</ul>;
  }
};
