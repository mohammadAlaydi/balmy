# Tabby Payment Integration Setup

This guide will help you set up Tabby payment integration in your e-commerce application.

## Prerequisites

1. A Tabby account (sign up at [tabby.ai](https://tabby.ai))
2. Your Tabby API credentials

## Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```bash
# Tabby Payment Configuration
NEXT_PUBLIC_TABBY_API_URL=https://api.tabby.ai
NEXT_PUBLIC_TABBY_PUBLIC_KEY=your_tabby_public_key_here
```

## Getting Your Tabby API Key

1. Log in to your Tabby dashboard
2. Navigate to API Keys section
3. Generate a new API key
4. Copy the public key and add it to your `.env.local` file

## Features Implemented

### Payment Methods
- **Credit/Debit Card**: Traditional payment processing
- **Tabby Installments**: Split payment into monthly installments
- **Tabby Pay Later**: Pay in 14 days

### Checkout Flow
1. User fills out personal information and shipping address
2. Selects preferred payment method
3. For Tabby options, installment plans are displayed
4. User is redirected to Tabby payment page
5. Payment is processed securely

## API Endpoints Used

- `POST /v2/payments` - Create payment session
- `GET /v2/installments` - Get available installment plans
- `GET /v2/payments/{id}` - Get payment status

## Testing

### Test Mode
- Use test API keys for development
- Test with small amounts
- Verify webhook handling

### Production
- Switch to production API keys
- Ensure proper error handling
- Monitor payment success rates

## Security Considerations

- Never expose private API keys in client-side code
- Use environment variables for sensitive data
- Implement proper validation for all inputs
- Handle payment failures gracefully

## Troubleshooting

### Common Issues
1. **API Key Invalid**: Check your `.env.local` file
2. **Payment Failed**: Verify amount and currency format
3. **Installment Plans Not Loading**: Check API endpoint availability

### Support
- Tabby Documentation: [docs.tabby.ai](https://docs.tabby.ai)
- Tabby Support: [support.tabby.ai](https://support.tabby.ai)

## Next Steps

1. Test the integration with test credentials
2. Customize the UI to match your brand
3. Implement webhook handling for payment updates
4. Add payment analytics and reporting
5. Implement order management system
