import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddProperty from "./AddProperty";

const Navbar = () => {
  return (
  <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
    <div className="max-2-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
            <Link href='/'>
                <Image src='/logo.png' alt='logo' width={170} height={48} />
            </Link>
            <div className="flex space-x-6">
                <SearchFilters />
            </div>
            <div className="flex items-center space-x-6">
                <AddProperty/>
                <UserNav />
            </div>
        </div>
    </div>
</nav>
);
};

export default Navbar;