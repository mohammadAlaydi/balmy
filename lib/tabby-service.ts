import { TabbyPaymentRequest, TabbyPaymentResponse, TabbyInstallmentPlan } from '@/types/types';

const TABBY_API_URL = process.env.NEXT_PUBLIC_TABBY_API_URL || 'https://api.tabby.ai';
const TABBY_PUBLIC_KEY = process.env.NEXT_PUBLIC_TABBY_PUBLIC_KEY;

export class TabbyService {
  private static instance: TabbyService;
  private apiKey: string;

  private constructor() {
    this.apiKey = TABBY_PUBLIC_KEY || '';
  }

  public static getInstance(): TabbyService {
    if (!TabbyService.instance) {
      TabbyService.instance = new TabbyService();
    }
    return TabbyService.instance;
  }

  /**
   * Create a new payment session with Tabby
   */
  async createPaymentSession(paymentData: TabbyPaymentRequest): Promise<TabbyPaymentResponse> {
    try {
      const response = await fetch(`${TABBY_API_URL}/v2/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`Tabby API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Tabby payment session:', error);
      throw new Error('Failed to create payment session');
    }
  }

  /**
   * Get available installment plans for a given amount
   */
  async getInstallmentPlans(amount: number, currency: string = 'EGP'): Promise<TabbyInstallmentPlan[]> {
    try {
      const response = await fetch(
        `${TABBY_API_URL}/v2/installments?amount=${amount}&currency=${currency}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Tabby API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.plans || [];
    } catch (error) {
      console.error('Error fetching installment plans:', error);
      return [];
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await fetch(`${TABBY_API_URL}/v2/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Tabby API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw new Error('Failed to fetch payment status');
    }
  }

  /**
   * Validate Tabby configuration
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const tabbyService = TabbyService.getInstance();
