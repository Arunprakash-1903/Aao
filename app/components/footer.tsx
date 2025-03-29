export default function Footer() {
    return (
      <footer className="bg-black text-white py-6 sticky mt-[22vh]">
        <div className="max-w-7xl mx-auto px-6 md:flex md:justify-between md:items-center">
          {/* Left Section - Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">a-a.o</h2>
            <p className="text-sm opacity-70">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
  
          {/* Right Section - Links */}
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row gap-4 text-sm text-gray-300">
              <li>
                <a href="/privacy-policy" className="hover:text-white transition duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-white transition duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/RefundPolicy" className="hover:text-white transition duration-300">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  