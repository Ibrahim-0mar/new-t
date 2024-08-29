import { cn } from '@/utils/helper/tailwind_cn';
import React from 'react';

/**
 * Container component for wrapping content with flexibility to choose the wrapper element.
 *
 * @component
 * @example
 *
 * // Example usage with default wrapper element:
 * <Container>
 *   Content goes here
 * </Container>
 *
 * // Example usage with a custom wrapper element:
 * <Container as="section">
 *   Content goes here
 * </Container>
 *
 * @param {object} props - The component props.
 * @param {React.ElementType} [props.as='div'] - The HTML element type for wrapping.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {React.HTMLAttributes<E>} [props] - Additional HTML attributes for the wrapper element.
 * @returns {React.ReactElement | null} The wrapped content.
 * @template E - The type of the wrapper element.
 */

interface ContainerProps<E extends React.ElementType = 'div'>
  extends React.HTMLAttributes<E> {
  as?: E | keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

const Container = <E extends React.ElementType = 'div'>({
  as: WrapperElement = 'div',
  children,
  className,
  ...props
}: ContainerProps<E>) => {
  const combinedClassName = cn(
    'container mx-auto px-3 sm:px-5  lg:px-[10%] ',
    className,
  );

  return (
    <WrapperElement className={combinedClassName} {...props}>
      {children}
    </WrapperElement>
  );
};

export default Container;
