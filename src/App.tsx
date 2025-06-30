import {
  Finished,
  Header,
  Loader,
  MainLayout,
  Progress,
  QuestionDisplay,
  StartScreen,
  ErrorComponent,
  Footer,
  Timer,
} from "./components";
import { FinishQuiz, NextQuestion, RestartQuiz } from "./components/buttons";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <MainLayout>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorComponent />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Progress />
              <QuestionDisplay />
              <Footer>
                <Timer />
                <NextQuestion />
                <FinishQuiz />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <>
              <Finished />
              <RestartQuiz />
            </>
          )}
        </MainLayout>
      </div>
    </>
  );
}

export default App;
