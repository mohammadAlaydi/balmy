'use client';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useFavourites } from '@/hooks/use-favourites';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface FavouriteButtonProps {
  product: any;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showText?: boolean;
}

export function FavouriteButton({
  product,
  size = 'default',
  variant = 'ghost',
  className,
  showText = false,
}: FavouriteButtonProps) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites();
  const isFav = isFavourite(product.id);

  // Check authentication state
  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to manage favourites');
      // Redirect to login page
      window.location.href = '/auth/login';
      return;
    }
    
    try {
      if (isFav) {
        await removeFromFavourites(product.id);
        toast.success('Product removed from favourites');
      } else {
        await addToFavourites(product);
        toast.success('Product added to favourites');
      }
    } catch (error) {
      // Handle authentication errors gracefully
      if (error && typeof error === 'string' && error.includes('login')) {
        toast.error('Please login to manage favourites');
        // Don't redirect automatically, let user decide
      } else {
        toast.error(isFav ? 'Error removing from favourites' : 'Error adding to favourites');
      }
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    default: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        'transition-all duration-200',
        isFav && 'text-red-500 hover:text-red-600',
        !isFav && 'text-gray-400 hover:text-red-500',
        size === 'sm' && 'p-1',
        !isAuthenticated && 'opacity-80 hover:opacity-100',
        className
      )}
      aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
      title={!isAuthenticated ? 'Login required to manage favourites' : (isFav ? 'Remove from favourites' : 'Add to favourites')}
    >
      {isFav ? (
        <FaHeart className={cn(iconSizes[size], 'transition-all duration-200 text-red-500')} />
      ) : (
        <FaRegHeart className={cn(iconSizes[size], 'transition-all duration-200 text-gray-500 group-hover:text-red-500')} />
      )}
      {showText && (
        <span className="ml-2">
          {isFav ? 'Remove' : 'Add to Favourites'}
        </span>
      )}
    </Button>
  );
}