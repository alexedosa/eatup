export default function LandingButton({ as: Component = "button", children, className = "", ...props }) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}
