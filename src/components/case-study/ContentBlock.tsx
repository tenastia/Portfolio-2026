interface ContentBlockProps {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
}

export default function ContentBlock({
  heading,
  subheading,
  children,
}: ContentBlockProps) {
  return (
    <section className="content-block max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
      <div className="flex flex-col gap-heading-body">
        {(heading || subheading) && (
          <div className="flex flex-col gap-1">
            {heading && (
              <h3 className="font-sans font-normal text-case-heading leading-case-heading tracking-[0.03em] text-text-muted">
                {heading}
              </h3>
            )}
            {subheading && (
              <p className="font-sans font-medium text-body-lg leading-body-lg text-[#575758]">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="font-sans font-normal text-case-body leading-case-body tracking-[0.02em] text-text-muted flex flex-col gap-paragraph">
          {children}
        </div>
      </div>
    </section>
  );
}
