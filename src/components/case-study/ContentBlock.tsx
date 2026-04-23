interface ContentBlockProps {
  heading?: string;
  children: React.ReactNode;
}

export default function ContentBlock({ heading, children }: ContentBlockProps) {
  return (
    <section className="max-w-[860px] mx-auto w-full px-page py-content-block-y">
      <div className="flex flex-col gap-heading-body">
        {heading && (
          <h3 className="font-sans font-normal text-h2 leading-h2 tracking-[0.03em] text-text">
            {heading}
          </h3>
        )}
        <div className="font-sans font-normal text-body-md leading-body-md tracking-[0.01em] text-text flex flex-col gap-paragraph">
          {children}
        </div>
      </div>
    </section>
  );
}
