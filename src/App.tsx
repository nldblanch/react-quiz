import Header from "./components/Header";
import MainLayout from "./MainLayout";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <MainLayout>
          <p>1/15</p>
          <p>Question</p>
        </MainLayout>
      </div>
    </>
  );
}

export default App;
