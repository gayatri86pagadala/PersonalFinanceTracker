import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    width: "100%",
                    minHeight: "100vh",
                    background: "#f4f6f9"
                }}
            >
                {children}
            </div>

        </div>

    );

}

export default Layout;