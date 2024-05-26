import User from '@/interface/UserProps';

interface NavBarProps{
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setPdfClickL: React.Dispatch<React.SetStateAction<boolean>>;
}

export default NavBarProps;