interface Blog {
    id: string;
    title: string;
    content: string;
    lastEditedBy?: string;
    isLocked: boolean ;
    lockedBy?: string;
    lockedAt?: Date;
}
interface BlogInitialState {
    blogs: Blog[];
    selectedBlog: Blog | null;
}
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    username:string 
  }
  type IconProps = {
    height?: string;
    width?: string;
    className?: string;
    fillColor?: string;
    isRadioChecked?: boolean;
  };
  interface ToastInitialState{
    isToastComponentActive: boolean
  }