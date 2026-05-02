import "@/app/globals.css";

export const metadata = {
  title: "EatUp Rider - Delivery Dashboard",
  description: "Manage your deliveries and earnings on EatUp",
};

export default function RiderLayout({ children }) {
  return (
    <div className="rider-app-root">
      <style>{`
        .rider-app-root {
          max-width: 500px;
          margin: 0 auto;
          min-height: 100vh;
          background: #F9FAFB;
          position: relative;
        }
        @media (min-width: 500px) {
          .rider-app-root {
            box-shadow: 0 0 100px rgba(0,0,0,0.05);
          }
        }
      `}</style>
      {children}
    </div>
  );
}
