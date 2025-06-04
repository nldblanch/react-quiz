type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return <main className="main">{children}</main>;
};

export default MainLayout;
