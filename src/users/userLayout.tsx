import { SiteHeader } from "../components/header/header";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export const UserLayout = ({ children }:DefaultLayoutProps) =>{

    return (
            <>
            <SiteHeader></SiteHeader>
            <main style={{marginTop: '58px'}}>
                <div className="container pt-4">
                {children}
                </div>
            </main>
            </>
    )
}

export default UserLayout;