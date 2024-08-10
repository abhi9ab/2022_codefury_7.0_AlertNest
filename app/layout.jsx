import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "alertnest",
  description: "Create disaster awareness",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
        <Provider>
            <div className='w-[100vw] min-h-[100vh] fixed flex justify-center px-120px py-20px'>
                <div className='h-fit z-10 w-full max-w-[640px] absolute top-[80px] opacity-[0.15]'/>
            </div>

            <main className='relative z-10 flex justify-center item-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
                <Nav />
            {children}
            </main>
        </Provider>
    </body>
  </html>
);

export default RootLayout;