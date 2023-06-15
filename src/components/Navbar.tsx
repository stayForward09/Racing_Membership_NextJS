import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemberstackModal, useAuth, useCustomerPortal, useMemberstack } from "@memberstack/react";
import ReactLoading from 'react-loading';
import { toast } from "react-toastify";

interface NavbarType {
    page?: string
}

function Navbar({ page = 'home' }: NavbarType) {
    const { openModal, hideModal } = useMemberstackModal();
    const { userId, status, signOut } = useAuth();
    const router = useRouter();
    const memberstack = useMemberstack();
    console.log('userId>>>>', userId)
    console.log('status', status)

    const [member, setMember] = React.useState<any>(null);
    const [planId, setPlanId] = React.useState<string>('');
    const [customerURL, setCustomerURL] = React.useState<string>('');
    const [xsHidden, setXsHidden] = React.useState<string>('hidden');

    React.useEffect(() => {
        getMembers();
    }, [])

    React.useEffect(() => {
        console.log('currentmember>>>>>>>', member)
        if (member == null) return;
        if (!member.planConnections) return;
        if (!member.planConnections[0]) return;
        console.log('planconnection>>>>>>>>', member.planConnections[0]['planId'])
        for (let i = 0; i < member.planConnections.length; i++) {
            if (!member.planConnections[i]) continue;
            if (member.planConnections[i]['type'] == 'SUBSCRIPTION') {
                setPlanId(member.planConnections[i]['planId'])
                break;
            }
        }
        setCustomerURL(member.stripeCustomerId)
    }, [member])

    const PriceIdFromPlanId: { [key: string]: string } = {
        'pln_monthly-plan-nxdh0xc3': 'prc_monthly-3neu02tq',
        'pln_quarterly-na16n0qdw': 'prc_quarterly-plan-la1pe01o4',
        'pln_daily-plan-6q1pi01hb': 'prc_daily-plan-981pj01hc',
        'pln_two-day-plan-a316v0qzp': 'prc_two-day-plan-q11pk01vh',
        'pln_weekly-plan-mu16w0qvn': 'prc_one-week-plan-du16x0qvv',
        'pln_annual-plan-dl1g60q6q': 'prc_annual-plan-da1g80qav'
    }
    console.log('priceID:>>>>>>>>', PriceIdFromPlanId[planId]);
    const openPortal = useCustomerPortal({
        priceIds: [
            PriceIdFromPlanId[planId]
        ],
    });

    const getMembers = () => {
        memberstack.getCurrentMember()
            .then(({ data: member }) => setMember(member))
            .catch((err) => console.log(err))
    }

    const callAPI = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer: customerURL, returnURL: window.location.href })
        };
        
        try {
            const res = await fetch(
                '/api/customPortal', requestOptions
            );
            const data = await res.json();
            
            window.location.href = data.url
        } catch(err) {
            console.log('fetchErr', err)
        }
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-full flex flex-wrap items-center justify-between mx-auto px-2 md:px-10">
                <Link href="/" className="flex items-center">
                    <Image
                        className=""
                        src="/logo1.png"
                        alt="Logo"
                        width={70}
                        height={70}
                    />
                    <span className="self-center text-xl tracking-widest font-bold whitespace-nowrap dark:text-white text-slate-900 uppercase">Racing</span>
                </Link>
                <div className="flex md:order-2">
                    {
                        !status ? <ReactLoading type={'spin'} color={'grey'} height={'20px'} width={'20px'} /> :
                            (userId ? (

                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-0 md:py-2 text-center mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() =>
                                    signOut().
                                        then(() => {
                                            setMember(null)
                                            setPlanId('')
                                            router.push('/')
                                        })}>Sign Out</button>

                            ) : (<>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() =>
                                    openModal({
                                        type: "LOGIN"
                                    }).then(({ data, type }) => {
                                        console.log('data', data);
                                        console.log('type: ', type);
                                        hideModal();
                                        getMembers();
                                    })
                                }>Sign In</button>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() =>
                                    openModal({
                                        type: "SIGNUP",
                                        // planId: ['']
                                    }).then(({ data, type }) => {
                                        console.log('data', data);
                                        console.log('type: ', type);
                                        hideModal();
                                        getMembers();
                                        if (data != undefined) router.push('/posts/pricing')
                                    })
                                }>Sign Up</button>
                            </>
                            ))}
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => {
                        if (xsHidden == 'hidden') setXsHidden('');
                        else setXsHidden('hidden');
                    }}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${xsHidden}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-14 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                href="/"
                                className="group transition-colors text-slate-400"
                                rel="noopener noreferrer"
                            >
                                <p className={`font-sans uppercase font-medium hover:text-slate-600 ${page == 'home' && 'text-slate-900'}`}>
                                    Home
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="group transition-colors text-slate-400"
                                rel="noopener noreferrer" onClick={() => {
                                    console.log('----------->>>', member)
                                    if (!member || !member.planConnections[0]) window.location.replace('/posts/pricing')
                                    else window.location.replace('/dashboard/landing_page.html')
                                }}
                            >
                                <p className={`font-sans uppercase font-medium hover:text-slate-600 ${page == 'dashbord' && 'text-slate-900'}`}>
                                    Dashbord
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/posts/pricing"
                                className="group transition-colors text-slate-400"
                                rel="noopener noreferrer"
                            >
                                <p className={`font-sans uppercase font-medium hover:text-slate-600 ${page == 'pricing' && 'text-slate-900'}`}>
                                    Pricing
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="group transition-colors text-slate-400"
                                rel="noopener noreferrer" onClick={() => {
                                    console.log('----------->>>', member)
                                    if (!member) openModal({
                                        type: "LOGIN"
                                    }).then(({ data, type }) => {
                                        console.log('data', data);
                                        console.log('type: ', type);
                                        hideModal();
                                        getMembers();
                                        // callAPI();
                                    })
                                    else if (!member.planConnections[0] || !planId) toast('It can be used only for Recurring memberships', { hideProgressBar: false, autoClose: 3000, type: 'error', position: 'bottom-right' });
                                    else {
                                        console.log('ismember>>>>>>>>>>>')
                                        callAPI()
                                            // .then(({ data: data }) => console.log(data))
                                            .catch((err) => console.log('error>>>', err))
                                    }
                                }}
                            >
                                <p className={`font-sans uppercase font-medium hover:text-slate-600 ${page == 'account' && 'text-slate-900'}`}>
                                    Account
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar