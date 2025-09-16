import { ShadowLayerProps } from '@/types/types';

export default function ShadowLayer({ children, layerStyle }: ShadowLayerProps) {
  return (
    <div
      className={`rounded-lg bg-white shadow-[0px_6px_20px_rgba(149,157,165,0.15)] transition-shadow duration-200  ${layerStyle}`}
    >
      {children}
    </div>
  );
}
