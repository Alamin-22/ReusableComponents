import React from 'react';

const CheckoutSection = () => {
    return (
        <div>
               {/* normal */}
               <div className="space-y-4">
                                    {/* Summary details */}
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">$7,592.00</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Savings</dt>
                                        <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                                        <dd className="text-base font-medium text-gray-900">$99</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900">$799</dd>
                                    </dl>
                                    {/* Total */}
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">$8,191.00</dd>
                                    </dl>
                                </div>
        </div>
    );
};

export default CheckoutSection;