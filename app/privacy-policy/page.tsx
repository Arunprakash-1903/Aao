import React from 'react'

const Privacy = () => {
  return (
    <div className='bg-gray-100 flex justify-center items-center min-h-screen p-4'>
    <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mt-2">Last Updated: March 05, 2025</p>

        <p className="text-gray-700 mt-4">
            This Privacy Policy outlines how <strong>Architecture-Academics.online</strong> ("we", "us", or "our") collects, 
            uses, and protects your personal information when you engage with our services ("Services").
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">1. Information We Collect</h2>
        <p className="text-gray-700 mt-2">We collect personal information that you voluntarily provide when registering on our platform, subscribing to newsletters, or engaging with our services. This may include:</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Personal Details:</strong> Name, email address, phone number, job title, academic affiliation</li>
            <li><strong>Account Information:</strong> Username, password</li>
            <li><strong>Payment Data:</strong> Processed securely by our payment partner (e.g., Razorpay)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Provide and improve our educational services</li>
            <li>Facilitate account creation and login</li>
            <li>Send updates, newsletters, and event notifications</li>
            <li>Monitor website performance and enhance user experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal regulations</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">3. Data Sharing and Disclosure</h2>
        <p className="text-gray-700 mt-2">We do not sell or trade personal information. However, we may share data with:</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Service Providers:</strong> Payment processing, hosting, and customer support</li>
            <li><strong>Legal Compliance:</strong> If required by law enforcement or regulatory authorities</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">4. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 mt-2">We use cookies to enhance user experience, analyze website traffic, and customize content. You may control cookie settings through your browser preferences.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">5. Social Media Logins</h2>
        <p className="text-gray-700 mt-2">If you register using social media accounts (e.g., Google, Facebook), we access basic profile information such as your name and email. Your interactions are governed by their privacy policies.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">6. Data Retention</h2>
        <p className="text-gray-700 mt-2">We retain personal data only as long as necessary for service delivery and legal compliance. If you terminate your account, some data may be retained for dispute resolution or legal enforcement.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">7. Data Security</h2>
        <p className="text-gray-700 mt-2">We implement security measures to protect your data. However, no system is entirely secure, so users should take precautions when sharing personal information online.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">8. Your Privacy Rights</h2>
        <p className="text-gray-700 mt-2">Under Indian data protection laws, you may:</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for data processing</li>
        </ul>
        <p className="text-gray-700 mt-2">To exercise these rights, contact us at <a href="mailto:admin@architecture-academics.online" className="text-blue-600 font-medium hover:underline">admin@architecture-academics.online</a>.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">9. Changes to This Policy</h2>
        <p className="text-gray-700 mt-2">We may update this Privacy Policy periodically. The latest version will always be available on our website.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">10. Contact Us</h2>
        <p className="text-gray-700 mt-2">For questions or concerns, reach out to:</p>
        <p className="text-gray-700 mt-2"><strong>Architecture Academics Online</strong></p>
        <p className="text-gray-700"><a href="mailto:admin@architecture-academics.online" className="text-blue-600 font-medium hover:underline">admin@architecture-academics.online</a></p>
    </div>
    </div>
  )
}

export default Privacy