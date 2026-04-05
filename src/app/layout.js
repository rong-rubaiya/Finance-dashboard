import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> {/* Default to dark mode */}
      <body className="bg-darkBg text-white antialiased">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 ml-20 flex flex-col min-h-screen">
            <Navbar />
            
            {/* Inner Content with Padding */}
            <div className="flex-1 px-8 pb-8">
              {children}
            </div>

            <div className="px-8">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}