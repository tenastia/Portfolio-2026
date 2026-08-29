import Reveal from "./Reveal";

export interface Takeaway {
  title: string;
  body: string[];
}

/**
 * The closing "what I'd improve next" list — numbered, each point a short title
 * over its reasoning.
 */
export default function Takeaways({
  id,
  heading,
  items,
}: {
  id?: string;
  heading: string;
  items: Takeaway[];
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-study px-page">
      <Reveal className="flex flex-col gap-title-body">
        <h2 className="font-serif text-study-h3 leading-study-h3 text-text-muted">
          {heading}
        </h2>
        <ol className="flex list-decimal flex-col gap-8 pl-[1.3em] text-study-body leading-study-body tracking-[0.01em] text-text-muted marker:text-text-highlight">
          {items.map(({ title, body }) => (
            <li key={title} className="pl-1">
              <span className="font-medium text-text">{title}</span>
              {body.map((paragraph) => (
                <p key={paragraph} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
