import React, { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

// Em ComponentProps eu estou dizendo que que eu quero poder utilizar os atributos de um botão
interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariables>{
    children: ReactNode
}

const buttonVariables = tv({
    base: 'rounded-lg px-5 font-medium flex items-center gap-2 justify-center',
    variants: {
        variant:{
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        },
        size:{
            default: 'py-2',
            full: 'w-full h-11'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})


// Com o '...props' eu estou dizendo que eu quero receber todos os atributos que um botão tenha
export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariables({ variant, size })}>
      {children}
    </button>
  );
}
