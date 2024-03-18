import React from 'react';
import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('text-black', {
  variants: {
    variant: {
      heading: 'text-2xl font-bold tracking-tight',
      subHeading: 'scroll-m-20 text-2xl font-semibold tracking-wider', //flex gap-5
      body: 'text-xl font-semibold tracking-wider',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type htmlTypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyProps = React.ComponentPropsWithRef<htmlTypographyTag> &
  VariantProps<typeof typographyVariants> & {
    as: htmlTypographyTag;
  };

export const Typography = ({
  as,
  className,
  variant,
  children,
  ref,
  ...props
}: TypographyProps) => {
  const Element = ({
    children,
    ...rest
  }: React.ComponentProps<htmlTypographyTag>) =>
    React.createElement(as, rest, children);

  return (
    <Element
      className={cn(typographyVariants({ variant, className }))}
      {...props}
      ref={ref}
    >
      {children}
    </Element>
  );
};

export default Typography;
