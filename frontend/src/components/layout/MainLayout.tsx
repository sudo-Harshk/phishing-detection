import type { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    );
}
