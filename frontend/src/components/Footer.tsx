const Footer = () => {
  return (
    <footer className="mt-10 border-t border-primary/20 bg-linear-to-r from-background via-background/95 to-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary/90">
          Educational Simulation • Privacy First
        </p>
        <ul className="flex flex-wrap gap-2 text-xs text-secondary sm:text-sm">
          <li className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1">
            GDPR + ePrivacy
          </li>
          <li className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1">
            No traceable personal data
          </li>
          <li className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1">
            Anonymized + hashed
          </li>
          <li className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1">
            Auto-deleted later
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
