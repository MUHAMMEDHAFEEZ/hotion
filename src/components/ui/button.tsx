'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
        outline:
          'border-2 border-border-gray-light bg-background text-text-black-light hover:bg-color-orange-50 hover:text-text-black-light hover:border-color-blue-primary transition-all duration-200',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-color-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200',
        ghost: 'text-text-gray-darker hover:bg-color-orange-50 hover:text-text-black-light transition-all duration-200',
        link: 'text-primary underline-offset-4 hover:underline text-color-blue-primary hover:text-text-blue-dark transition-colors duration-200',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
