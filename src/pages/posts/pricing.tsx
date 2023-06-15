import React from 'react';
import Navbar from '@/components/Navbar'
import { useMemberstack, useMemberstackModal } from "@memberstack/react";
import { useCheckout, MemberstackProtected } from "@memberstack/react"
import Link from 'next/link';
import { toast } from "react-toastify";

const Pricing = () => {
    const { openModal, hideModal } = useMemberstackModal();
    const memberstack = useMemberstack();
    const checkout = useCheckout();
    const [member, setMember] = React.useState<any>(null);
    const [showList, setShowList] = React.useState<string>('rec');

    React.useEffect(() => {
        memberstack.getCurrentMember()
            .then(({ data: member }) => setMember(member))
            .catch((err) => console.log(err))
    }, [])
    console.log('>>>', member)
    const isMember = async (priceID: string) => {
        if (!member) {
            openModal({
                type: "SIGNUP",
                // planId: []
            }).then(({ data, type }) => {
                console.log('data', data);
                console.log('type: ', type);
                memberstack.getCurrentMember()
                    .then(({ data: member }) => setMember(member))
                    .catch((err) => console.log(err))
                hideModal();
            }).catch((err) => console.log('err', err))
        } else {
            if (member.id) {
                checkout({
                    priceId: priceID,
                }).then((data) => {
                    console.log('checkout_data', data);
                }).catch((err) => toast(err.message, { hideProgressBar: false, autoClose: 3000, type: 'error', position: 'bottom-right' }))
            } else {
                openModal({
                    type: "SIGNUP",
                    // planId: []
                }).then(({ data, type }) => {
                    console.log('data', data);
                    console.log('type: ', type);
                    memberstack.getCurrentMember()
                        .then(({ data: member }) => setMember(member))
                        .catch((err) => console.log(err))
                    hideModal();
                }).catch((err) => console.log('err', err))
            }
        }

    }

    return (
        <>
            <Navbar page="pricing" />
            <div className='price_page'>
                <div className='container xl:max-w-6xl xs:min-w-[300px] mt-20'>
                    <div className="flex mt-36">
                        <div className='mx-auto'>
                            <button className="relative inline-flex items-center font-sans justify-center p-0.5 mb-2 mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-blue-700  hover:text-white dark:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={() => setShowList('rec')}>
                                <span className={`relative px-5 py-2.5 transition-all ease-in duration-75  ${showList == 'rec' ? 'bg-opacity-0 text-white' : 'bg-white text-black'} dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white`}>
                                    &nbsp;Recurring&nbsp;
                                </span>
                            </button>
                            <button className="relative inline-flex items-center font-sans justify-center p-0.5 mb-2 mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-blue-700  hover:text-white dark:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={() => setShowList('one')}>
                                <span className={`relative px-5 py-2.5 transition-all ease-in duration-75  ${showList == 'one' ? 'bg-opacity-0 text-white' : 'bg-white text-black'} dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white`}>
                                    &nbsp;&nbsp;&nbsp;One-off&nbsp;&nbsp;&nbsp;
                                </span>
                            </button>
                        </div>

                    </div>
                    {showList == 'rec' ? (
                        <div className="row mt-0 md:mt-5 grid lg:grid-cols-3 xs:grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mx-auto">
                            <div className="col-md-4 col-sm-6">
                                <div className="pricing-table-3 basic">
                                    <div className="ribbon ribbon-1 right lg:left-[142px] md:left-[110px] sm:left-[140px] xs:left-[120px]">Most Popular</div>
                                    <div className="pricing-table-header mt-[-22px]">
                                        <h4><strong>MONTHLY PLAN</strong></h4>
                                        <p>Recurring memberships</p>
                                    </div>
                                    <div className="price"><strong>£20</strong> / MONTH</div>
                                    <div className="pricing-body mt-[-22px]">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>  Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Recurring monthly payments</li>
                                        </ul>
                                        <a href="#"
                                            onClick={() => isMember('prc_monthly-3neu02tq')}
                                            className="view-more mt-12">Subscribe</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="pricing-table-3 premium">
                                    <div className="pricing-table-header">
                                        <h4 className='uppercase'><strong>Quarterly Plan</strong></h4>
                                        <p>Recurring memberships</p>
                                    </div>
                                    <div className="price"><strong>£50</strong> / 3 MONTH</div>
                                    <div className="pricing-body">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Recurring quarterly payments</li>
                                        </ul><a href="#" onClick={() => isMember('prc_quarterly-plan-la1pe01o4')} className="view-more mt-12">Subscribe</a></div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="pricing-table-3 business">
                                    <div className="pricing-table-header">
                                        <h4 className='uppercase'><strong>Annual Plan</strong></h4>
                                        <p>Recurring memberships</p>
                                    </div>
                                    <div className="price"><strong>£180</strong> / YEAR</div>
                                    <div className="pricing-body">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Recurring annual payments</li>
                                        </ul><a href="#" onClick={() => isMember('prc_annual-plan-da1g80qav')} className="view-more mt-12">Subscribe</a></div>
                                </div>
                            </div>
                        </div>
                    ) :
                        <div className="row mt-0 md:mt-5 grid  lg:grid-cols-3 xs:grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mx-auto">
                            <div className="col-md-4 col-sm-12">
                                <div className="pricing-table-3 business">
                                    <div className="pricing-table-header">
                                        <h4 className='uppercase'><strong>Daily Plan</strong></h4>
                                        <p>One-off memberships</p>
                                    </div>
                                    <div className="price"><strong>£5</strong> / ONCE</div>
                                    <div className="pricing-body">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Use our daily plan to trial our dashboard with one simple payment</li>
                                        </ul><a href="#" onClick={() => isMember('prc_daily-plan-981pj01hc')} className="view-more mt-12">Pay</a></div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="pricing-table-3 basic">
                                    <div className="pricing-table-header">
                                        <h4 className='uppercase'><strong>Two-day Plan</strong></h4>
                                        <p>One-off memberships</p>
                                    </div>
                                    <div className="price"><strong>£7.5</strong> / ONCE</div>
                                    <div className="pricing-body">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Use our two-day plan to trial our dashboard with one simple payment</li>
                                        </ul><a href="#" onClick={() => isMember('prc_two-day-plan-q11pk01vh')} className="view-more mt-12">Pay</a></div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="pricing-table-3 premium">
                                    <div className="pricing-table-header">
                                        <h4><strong>One Week Plan</strong></h4>
                                        <p>One-off memberships</p>
                                    </div>
                                    <div className="price"><strong>£10</strong> / ONCE</div>
                                    <div className="pricing-body">
                                        <ul className="pricing-table-ul">
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Dashboard Access</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Ratings for each horse, in every race</li>
                                            <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ display: 'unset' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Use our one week plan to trial our dashboard with one simple payment</li>
                                        </ul><a href="#" onClick={() => isMember('prc_one-week-plan-du16x0qvv')} className="view-more mt-12">Pay</a></div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>

    );
}

export default Pricing;



