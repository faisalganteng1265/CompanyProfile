import Link from "next/link";
import { Arrow, Contours } from "./icons";

export function Breadcrumb({
  current,
  parent,
}: {
  current: string;
  parent?: { label: string; href: string };
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Beranda</Link>
      <span>/</span>
      {parent && (
        <>
          <Link href={parent.href}>{parent.label}</Link>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function PageIntro({
  number,
  label,
  title,
  accent,
  description,
}: {
  number: string;
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className="page-intro container">
      <div className="page-intro-top page-enter">
        <span className="eyebrow">
          {number} / {label}
        </span>
        <span className="eyebrow">THE TATSUO COLLECTION</span>
      </div>
      <div className="page-intro-heading">
        <h1 className="page-enter">
          {title}
          <br />
          <em>{accent}</em>
        </h1>
        <p className="page-enter">{description}</p>
      </div>
    </div>
  );
}
export function SectionEyebrow({
  children,
  number,
}: {
  children: React.ReactNode;
  number: string;
}) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}
export function NextChapter({
  label,
  title,
  accent,
  href,
  cta,
}: {
  label: string;
  title: string;
  accent: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="next-chapter">
      <Contours />
      <div className="container">
        <span className="eyebrow">{label}</span>
        <div>
          <h2 className="page-reveal">
            {title}
            <br />
            <em>{accent}</em>
          </h2>
          <Link href={href} className="chapter-link">
            <Arrow diagonal />
            <span>{cta}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
