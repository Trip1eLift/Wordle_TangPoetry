import React from 'react';
import TopAppBar from './components/TopAppBar';
import WordMatrix from './components/WordMatrix';
import WordBank from './components/WordBank';
import Controller from './components/Controller';
import ShareBox from './components/ShareBox';
import AnswerPopup from './components/AnswerPopup';
import problenGenerator from './components/problemGenerator';

function App() {

  const [progress, setProgress] = React.useState({row: 0, attempts: ["", "", "", "", "", ""]});
  const [gameState, setGameState] = React.useState("ongoing"); // ongoing, win, lose
  const [problemGeneratorStatic, ] = React.useState(new problenGenerator(Math.floor(Math.random() * 10)));
  //const wordPool = "寥落古行宮宮花寂寞紅白頭宮女在閒坐說玄宗白日依山盡黃河入海流";
  //const answer = "寥落古行宮";
  const [answer, wordPool] = problemGeneratorStatic.getInit();
  React.useEffect(() => {
    // Only for beta debugging
    console.log(answer);
  }, []);

  // Force re-render tech
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const outputMessage = "Tangle (beta), v" + problemGeneratorStatic.getSeed().toString();
  return (
    <div>
      <TopAppBar />
      <WordMatrix progress={progress} answer={answer} />
      <WordBank wordPool={wordPool} progress={progress} setProgress={setProgress} answer={answer} forceUpdate={forceUpdate} gameState={gameState} />
      <Controller progress={progress} setProgress={setProgress} forceUpdate={forceUpdate} gameState={gameState} setGameState={setGameState} answer={answer} />
      <ShareBox gameState={gameState} answer={answer} progress={progress} output={outputMessage}/>
      <AnswerPopup gameState={gameState} answer={answer}/>
    </div>
  );
}

export default App;
