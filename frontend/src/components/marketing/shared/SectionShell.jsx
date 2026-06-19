export default function SectionShell({ as: Component = "section", children, className = "" }) {
  return <Component className={className}>{children}</Component>;
}
