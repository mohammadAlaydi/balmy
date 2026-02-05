# Markatty E-Commerce API Documentation

## Overview

This document describes the API integration with the Markatty E-commerce platform for the Next.js application.

## Base Configuration

All API requests are proxied through Next.js API routes in `pages/api/` to keep credentials secure.

### Environment Variables

```env
api_token=your_markatty_api_token
NEXT_PUBLIC_MOBIKUL_BASE_URL=https://shopik-loopik.markatty.com/mobikulhttp
NEXT_PUBLIC_STORE_ID=198
NEXT_PUBLIC_CURRENCY=EGP
NEXT_PUBLIC_LOCALE=en
```

### Common Parameters

Most endpoints accept these query parameters:
- `storeId`: Store identifier (default: 198)
- `locale`: Language code (ar, en)
- `currency`: Currency code (EGP, USD)
- `width`: Image width for responsive images
- `mFactor`: Image density multiplier

## Implemented Endpoints (Phase 1)

### Catalog

#### Get Homepage Data
```
GET /api/catalog/homepage
```

**Response includes:**
- `bannerImages`: Hero slider images
- `categories`: Product categories
- `featuredCategories`: Featured category collections
- `carousel`: Featured/new/sale product lists
- `gallaryList`: Gallery images
- `partners`: Partner/brand logos
- `promotions`: Trust badges/USPs
- `cmsData`: CMS page links
- `ads`: Advertisement banners

#### Get Category List
```
GET /api/catalog/getCategorylist
```

**Response:**
- List of all categories with thumbnails and banners

### Customer Authentication

#### Create Account
```
POST /api/customer/createaccount

Body:
{
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```
POST /api/customer/login

Body:
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
- JWT token for authenticated requests
- Customer profile data

#### Logout
```
POST /api/extra/logout
```

#### Get Customer Profile
```
GET /api/customer/get
```

#### Update Customer Profile
```
POST /api/customer/profile

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "phone": "1234567890"
}
```

### Customer Addresses

#### Create Address
```
POST /api/customer/addresses

Body:
{
  "address1": "123 Main St",
  "city": "Cairo",
  "country": "Egypt",
  "state": "default"
}
```

#### Update Address
```
PUT /api/customer/addresses/[id]

Body:
{
  "address1": "123 Main St",
  "city": "Cairo",
  "country": "Egypt"
}
```

#### Delete Address
```
DELETE /api/customer/addresses/[id]
```

### CMS

#### Get CMS Page Content
```
GET /api/extra/cmsdata?id=[page_id]
```

## Planned Endpoints (Phase 2)

### Catalog

- `GET /api/catalog/productdetails?productId={id}` - Get product details
- `GET /api/catalog/categoryproducts?categoryId={id}` - Get products in category
- `GET /api/catalog/productCollection` - Get product collections
- `GET /api/catalog/advancedsearch` - Advanced product search

### Cart & Wishlist

- `POST /api/checkout/addtocart` - Add product to cart
- `POST /api/checkout/updatecart` - Update cart item quantity
- `POST /api/checkout/removefromcart` - Remove item from cart
- `POST /api/checkout/emptycart` - Clear entire cart
- `GET /api/checkout/cartdetails` - Get cart details
- `GET /api/customer/wishlist` - Get wishlist items
- `POST /api/customer/addtowishlist` - Add to wishlist
- `POST /api/customer/removefromwishlist` - Remove from wishlist

### Checkout

- `GET /api/checkout/shippingmethods` - Get available shipping methods
- `POST /api/checkout/saveaddress` - Save shipping/billing address
- `GET /api/checkout/paymentinfo` - Get payment methods
- `POST /api/checkout/placeorder` - Place order
- `GET /api/checkout/orderreview` - Review order before placing

### Orders

- `GET /api/customer/orderlist` - Get customer orders
- `GET /api/customer/orderdetails?orderId={id}` - Get order details
- `POST /api/order/reorder` - Reorder previous order
- `POST /api/order/cancel` - Cancel order

### Reviews

- `POST /api/customer/savereview` - Submit product review
- `GET /api/catalog/reviewlist?productId={id}` - Get product reviews

## Authentication

Authenticated endpoints require a JWT token obtained from the login endpoint. The token should be passed in requests via cookies (automatically handled by Next.js API routes).

## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

## Frontend Integration

### Redux Slices

- `home-slice.ts` - Homepage data
- `categories-slice.ts` - Category data
- `auth-slice.ts` - Authentication state
- `products-slice.ts` - Product details (Phase 2)
- `cart-slice.ts` - Shopping cart (Phase 2)
- `wishlist-slice.ts` - Wishlist (Phase 2)

### Example Usage

```typescript
// Fetch homepage data
import { useDispatch } from 'react-redux';
import { getHomeData } from '@/store/slices/home-slice';

const dispatch = useDispatch();
dispatch(getHomeData());
```

## Image Optimization

Product images support responsive sizing via `width` and `mFactor` parameters. The Markatty CDN serves optimized WebP images.

Example:
```
https://cdn2.markatty.com/public/product/176386/image.webp
```

## Future Enhancements

- Product filters and sorting
- Customer notifications
- Downloadable products
- Flash deals/promotions
- Advanced search with filters
- Multi-language content management
