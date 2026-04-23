export default function CalloutCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
      <div className="border border-[#4e4e4f] rounded-[16px] px-7 pt-7 pb-8">
        <p className="font-sans font-normal text-call-out leading-call-out tracking-[0.02em] text-text opacity-30">
          {children}
        </p>
      </div>
    </section>
  );
}
