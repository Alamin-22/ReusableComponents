"use client";
import { useGetOrderDetailsForAdminQuery } from '@/app/Redux/features/addedProductSlice/addedProductApi';
import Spinner from '@/Components/RarelyUsedComponent/loader/Spinner';
import React, { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from "@/Assets/logo.webp"
import Image from 'next/image';

// Set up pdfMake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Have to instal these package 
// html-to-pdfmake
// pdfmake

const InvoicePage = ({ params }) => {
    const [isClient, setIsClient] = useState(false);

    const order_id = params.order_id;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: OrderDetails, isLoading } = useGetOrderDetailsForAdminQuery({ order_id });

    // Loading state to avoid hydration errors
    if (!isClient || isLoading) {
        return <Spinner />;
    }

    // Function to generate and download PDF
    const downloadPDF = () => {
        const docDefinition = {
            content: [
                {
                    columns: [

                        {
                            text: [
                                { text: 'Date: ', bold: true },
                                `Order Date:\n`,
                                { text: 'Invoice Id: ', bold: true },
                                `${order_id}\n`
                            ],
                            alignment: 'right',
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: [
                                { text: 'Billing Information\n', style: 'header' },
                                { text: `${OrderDetails?.billing_details?.name}\n`, bold: true },
                                `${OrderDetails?.billing_details?.email}\n`,
                                `${OrderDetails?.billing_details?.phone}\n`,
                                `${OrderDetails?.billing_details?.address}\n`,
                                `${OrderDetails?.billing_details?.city}, ${OrderDetails?.billing_details?.country}\n`
                            ]
                        },
                        {
                            text: [
                                { text: 'Shipping Information :\n ', style: 'header' },
                                `${OrderDetails?.shipping_details?.address}\n`,
                                `${OrderDetails?.billing_details?.city}, ${OrderDetails?.billing_details?.country}\n`
                            ],
                            alignment: 'right',
                        }
                    ]
                },
                {
                    text: 'Order Summary :',
                    style: 'header',
                    margin: [0, 10, 0, 10]
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto'],
                        alignment: 'center',
                        body: [
                            ['Product', 'Quantity', 'Price'],
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            ...OrderDetails?.order_items?.map(item => [item.title, item.quantity, `${item.price} TK`]),
                            [{ text: 'Discount', colSpan: 2 }, {}, `${OrderDetails?.total_amount} TK`],
                            [{ text: 'Shipping Cost', colSpan: 2 }, {}, `${OrderDetails?.total_amount} TK`],
                            [{ text: 'Total', colSpan: 2, bold: true }, {}, { text: `${OrderDetails?.total_amount} TK`, bold: true }]
                        ]
                    }
                },
                {
                    text: [
                        '\nThank you for your purchase!\n',
                        'If you have any questions about this invoice, please contact us at support@example.com.'
                    ],
                    alignment: 'center',
                    style: 'footer'
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                footer: {
                    fontSize: 10,
                    margin: [0, 10, 0, 0]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download(`invoice_${order_id}.pdf`);
    };

    return (
        <>
            <div className="my-16 p-8 bg-white border rounded-lg max-w-2xl mx-auto" id="invoice">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <Image
                        className='w-36 h-auto'
                        src={logo}
                        alt="Logo of Meherun Western Beauty Product" />

                    <div className="text-right text-gray-500 ">
                        <p className="">Date: Order Date</p>
                        <h1 className="text-2xl font-semibold">Invoice Id: {order_id}</h1>
                    </div>
                </div>

                {/* Billing and Shipping Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h2 className="text-lg text-gray-700 font-bold">Billing Information :</h2>
                        <p className='font-semibold text-gray-500'>{OrderDetails?.billing_details?.name}</p>
                        <p>{OrderDetails?.billing_details?.email}</p>
                        <p>{OrderDetails?.billing_details?.phone}</p>
                        <p>{OrderDetails?.billing_details?.address}</p>
                        <p>{OrderDetails?.billing_details?.city}, {OrderDetails?.billing_details?.country}</p>
                    </div>
                    <div className='text-right'>
                        <h2 className="text-lg text-gray-700 font-bold">Shipping Information</h2>
                        <p>{OrderDetails?.shipping_details?.address}</p>
                        <p>{OrderDetails?.billing_details?.city}, {OrderDetails?.billing_details?.country}</p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 text-left p-2">Product</th>
                                <th className="border border-gray-500 text-center p-2">Quantity</th>
                                <th className="border border-gray-500 text-right p-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderDetails?.order_items?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="border border-gray-500 py-2 px-2">{item.title}</td>
                                    <td className="border border-gray-500 text-center py-2">{item.quantity}</td>
                                    <td className="border border-gray-500 text-right p-2">{item.price} TK</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="font-medium text-gray-700 border border-gray-500">
                                <td className="p-2">Discount</td>
                                <td></td>
                                <td className="text-right p-2">{OrderDetails?.total_amount} TK</td>
                            </tr>
                            <tr className="font-medium border text-gray-700 border-gray-500">
                                <td className="p-2">Shipping Cost</td>
                                <td></td>
                                <td className="text-right p-2">{OrderDetails?.total_amount} TK</td>
                            </tr>
                            <tr className="font-bold border text-gray-700 border-gray-500">
                                <td className="p-2">Total</td>
                                <td></td>
                                <td className="text-right p-2">{OrderDetails?.total_amount} TK</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-500">Thank you for your purchase!</p>
                    <p className="text-sm text-gray-500">If you have any questions about this invoice, please contact us at support@example.com.</p>
                </div>

                {/* Download Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={downloadPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                        Download Invoice
                    </button>
                </div>
            </div>
        </>
    );
};

export default InvoicePage;
