import axios from 'axios';
import config from '../../config';

type TPaymentDataProps = {
  transactionId: string;
  totalCost: number;
  customerEmail: string;
};

export const initiatePayment = async (paymentData: TPaymentDataProps) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.storeId,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url:
      'http://localhost:3000/api/v1/payment/confirmation',
    fail_url: 'http://www.merchantdomain.com/failedpage.html',
    cancel_url: 'http://www.merchantdomain.com/cancellpage.html',
    amount: paymentData.totalCost,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: 'N/A',
    cus_email: paymentData.customerEmail,
    cus_add1: 'N/A',
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: 'N/A',
    type: 'json',
  });
  return response.data;
};
