import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Header({
  children,
}: {
  children: React.ReactNode
}){
    return (
        <>
            <header className='sticky top-0 z-50 w-full p-4 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md'>
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5c0 .526-.27.988-.659 1.256a6.012 6.012 0 01-2.708 1.912A6.003 6.003 0 014.332 8.027z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-xl">Web3 DApp</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-white/10 rounded-full p-1">
                        <ThemeToggle />
                    </div>
                    <ConnectButton />
                </div>
            </header>
            {children}
        </>
    )
}