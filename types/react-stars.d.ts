declare module 'react-stars' {
  import { Component } from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    size?: number;
    half?: boolean;
    color1?: string;
    color2?: string;
    onChange?: (newRating: number) => void;
    edit?: boolean;
  }

  class ReactStars extends Component<ReactStarsProps> {}

  export default ReactStars;
}

