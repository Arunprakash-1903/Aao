import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Dropdown from './dropdown';

const Header = () => {
    const { data: session } = useSession();
    const [designation, setDesignation] = useState<string | null>(null);

    useEffect(() => {
        const fetchDesignation = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await fetch('/api/getDes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: session.user?.email}),
                });
                const data = await response.json();
                setDesignation(data.jd); // Assuming API returns `{ jd: "faculty" }`
            } catch (error) {
                console.error('Error fetching designation:', error);
            }
        };

        fetchDesignation();
    }, [session]);
console.log(designation);

    return (
        <header className="bg-white shadow top-0 sticky z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/v2024">
                    <div className="flex items-center justify-center space-x-4">
                        <img src="/logo.jpeg" alt="Barry Wehmiller" className="w-10 h-10 object-contain" />
                        <div className="text-xl font-bold">architecture-academics.online</div>
                    </div>
                </Link>

                <div className="flex flex-col space-y-3">
                    <div className="300 w-[400px]">
                        <div className="flex justify-end items-center text-xs">
                            {!session ? (
                                <Link href="/Login" className="flex justify-end items-center text-xs">
                                    <div>SignIn</div>
                                </Link>
                            ) : (
                                <Dropdown text={session.user?.email} />
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4 items-center text-xs text-black font-bold">
                        <a href="/v2024/NataCourse">NATA course</a>
                        <a href="/v2024/Courses">Courses</a>
                        <a href="/v2024/workshop">WorkShops</a>
                        <a href="/v2024/Jobs">Jobs</a>
                        {designation === 'Faculty' && <a href="/v2024/fdp">FDP</a>}
                        <a href="/v2024/Surveys">Surveys</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
