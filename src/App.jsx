import "./App.css";
import Content from "./components/content/Content";

function App() {
  return (
    <>
      <div className="main-container">
        <header className="admin-header flex-center">
          <h2>Admin UI</h2>
        </header>

        <main className="content-main flex-center">
          <Content />
        </main>

        <footer className="admin-footer flex-center">
          <h2>Manage all user details at one place!</h2>
        </footer>
      </div>
    </>
  );
}

export default App;
