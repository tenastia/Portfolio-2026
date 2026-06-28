interface ContentBlockProps {
  heading?: string;
  children: React.ReactNode;
}

export default function ContentBlock({ heading, children }: ContentBlockProps) {
  return (
    <section className="content-block max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
      <div className="flex flex-col gap-heading-body">
        {heading && (
          <h3 className="font-sans font-normal text-case-heading leading-case-heading tracking-[0.03em] text-text-muted">
            {heading}
          </h3>
        )}
        <div className="font-sans font-normal text-case-body leading-case-body tracking-[0.02em] text-text-muted flex flex-col gap-paragraph">
          {children}
        </div>
      </div>
    </section>
  );
}
