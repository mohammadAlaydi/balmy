/**
 * Favourite Slice
 * 
 * This slice manages the favourites/wishlist state.
 * It re-exports the wishlist reducer as the default export
 * for backward compatibility with the store configuration.
 */

import { wishlistReducer } from "./wishlist-slice";

// Re-export the wishlist reducer as default for store.ts compatibility
export default wishlistReducer;

// Also re-export all wishlist actions for consumers that import from favourite-slice
export { getWishlist, addToWishlist, removeFromWishlist } from "./wishlist-slice";
