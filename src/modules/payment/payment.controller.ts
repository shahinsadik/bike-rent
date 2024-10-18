import { Request, Response } from 'express';

const paymentConfirmation = async (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Success</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
            }
            .container h1 {
                color: #28a745;
                font-size: 36px;
                margin-bottom: 20px;
            }
            .container p {
                font-size: 18px;
                margin-bottom: 30px;
            }
            .container .success-icon {
                font-size: 50px;
                color: #28a745;
                margin-bottom: 20px;
            }
            .container .btn {
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                transition: background-color 0.3s ease;
            }
            .container .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✔</div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your payment has been processed successfully.</p>
        </div>
    </body>
    </html>
  `);
};

export const PaymentControllers = {
  paymentConfirmation,
};
