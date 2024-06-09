import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
  }

export default function Button({ children, className, ...rest }: ButtonProps){
    return (
        <button className={`btn ${className}`} {...rest}>
            {children}
        </button>
    );
}