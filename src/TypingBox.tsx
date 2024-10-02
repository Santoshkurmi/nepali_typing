import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PlayIcon, StopCircle, RefreshCw } from 'lucide-react';
import Modal from "react-modal";
import wordCorpus from "./assets/sentences.txt";
// import Nepal from "nepalify";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const keyToNep:any = {
  //
  "a": "\u093E", // ा
  "b": "\u092C", // ब
  "c": "\u091B", // छ
  "d": "\u0926", // द
  "e": "\u0947", // े
  "f": "\u0909", // उ
  "g": "\u0917", // ग
  "h": "\u0939", // ह
  "i": "\u093F", // ि
  "j": "\u091C", // ज
  "k": "\u0915", // क
  "l": "\u0932", // ल
  "m": "\u092E", // म
  "n": "\u0928", // न
  "o": "\u094B", // ो
  "p": "\u092A", // प
  "q": "\u091F", // ट
  "r": "\u0930", // र
  "s": "\u0938", // स
  "t": "\u0924", // त
  "u": "\u0941", // ु
  "v": "\u0935", // व
  "w": "\u094C", // ौ
  "x": "\u0921", // ड
  "y": "\u092F", // य
  "z": "\u0937", // ष
  //
  "A": "\u0906", // आ
  "B": "\u092D", // भ
  "C": "\u091A", // च
  "D": "\u0927", // ध
  "E": "\u0948", // ै
  "F": "\u090A", // ऊ
  "G": "\u0918", // घ
  "H": "\u0905", // अ
  "I": "\u0940", // ी
  "J": "\u091D", // झ
  "K": "\u0916", // ख
  "L": "\u0933", // ळ
  "M": "\u0902", // ं
  "N": "\u0923", // ण
  "O": "\u0913", // ओ
  "P": "\u092B", // फ
  "Q": "\u0920", // ठ
  "R": "\u0943", // ृ
  "S": "\u0936", // श
  "T": "\u0925", // थ
  "U": "\u0942", // ू
  "V": "\u0901", // ँ
  "W": "\u0914", // औ
  "X": "\u0922", // ढ
  "Y": "\u091E", // ञ
  "Z": "\u090B", // ऋ
  //
  "0": "\u0966", // ०
  "1": "\u0967", // १
  "2": "\u0968", // २
  "3": "\u0969", // ३
  "4": "\u096A", // ४
  "5": "\u096B", // ५
  "6": "\u096C", // ६
  "7": "\u096D", // ७
  "8": "\u096E", // ८
  "9": "\u096F", // ९
  //
  "^": "\u005E", // ^
  //
  "`": "\u093D", // ऽ
  "~": "\u093C", // ़
  //
  "_": "\u0952", // ॒
  //
  "+": "\u200C", // ZWNJ
  "=": "\u200D", // ZWJ
  //
  "[": "\u0907", // इ
  "{": "\u0908", // ई
  //
  "]": "\u090F", // ए
  "}": "\u0910", // ऐ
  //
  "\\": "\u0950", // ॐ
  "|": "\u0903", // ः
  //
  "<": "\u0919", // ङ
  //
  ".": "\u0964", // ।
  ">": "\u0965", // ॥
  //
  "/": "\u094D", // ्
  "?": "\u003F", // ?
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function TypingBox() {
  const [words, setWords] = useState<string[]>([]);
  const sentenceWordTrack = useRef<number>(-1);
  const sentence = useRef<string[]>([]);

  const [input, setInput] = useState('');
  const [duration, setDuration] = useState(60);
  const previousText = useRef<string>(input);
  const [timer, setTimer] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // const noOfErrors = useRef<number>(0);
  const currentIndexOfWord = useRef<number>(0);
  const errorCounts = useRef<number>(0);
  const totalCount = useRef(0);
  const currentErrorIndex = useRef<number>(-1);
  const errorsIndex = useRef<number[]>([]);
  const [result, setResult] = useState({ accuracy: 0, wrong: 0, right: 0 })

  // const words = useMemo(() => text.split(" "), [text]);
  // const []
  const [fileContent, setFileContent] = useState<string[]>([]);


  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(wordCorpus);
      const text = await response.text();
      setFileContent(text.split("\n").sort(() => 0.5 - Math.random()));
    };
    fetchFile();
  }, []);


  useEffect(() => {
    if (fileContent.length == 0) return;
    // console.log("hello2")
    setRandomWords()
  }, [fileContent])


  function setRandomWords() {

    var sentenceNow = sentence.current;
    var senTrack = sentenceWordTrack.current;
    console.log(sentence.current, "Now")
    if (sentenceNow.length == 0) {
      console.log("Now happening")
      const index = Math.round(Math.random() * (fileContent.length - 1));
      sentence.current = fileContent[index].split(" ")
      sentenceNow = sentence.current;

      sentenceWordTrack.current = 0;
      senTrack = 0;
    }
    // const senTrack = sentenceWordTrack.current;
    // if(senTrack < sentenceN  ow.length ){
    console.log(sentenceNow, 'quoteint')
    let quotient = Math.ceil((sentenceNow.length - senTrack) / 10);
    console.log(quotient, "quotient")
    let remainder = (sentenceNow.length - senTrack) % 10;
    if (quotient > 0) {
      console.log("hello")
      sentenceWordTrack.current = senTrack + 10;
      setWords(sentenceNow.slice(senTrack, senTrack + 10))
    }
    else if (remainder > 0) {
      sentenceWordTrack.current = senTrack + remainder;
      setWords(sentenceNow.slice(senTrack, senTrack + remainder))
    }
    else {
      alert("hello")
      sentence.current = [];
      setRandomWords()
    }

  }






  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsActive(false);
      calculateWPM();

    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const calculateWPM = () => {
    // const words = totalCount.current;
    const correctTotal = totalCount.current - errorCounts.current;
    const wordsPerMin = Math.round(correctTotal / duration * 60);
    const accuracy = correctTotal / totalCount.current * 100;
    // alert("Your speed is " + wordsPerMin)
    setResult({ accuracy: accuracy, right: correctTotal, wrong: errorCounts.current })
    setIsOpen(true)
    setWordsPerMinute(wordsPerMin);
  };

  const handleStart = () => {
    setIsActive(true);
    // setInput('');
    currentIndexOfWord.current = 0;
    currentErrorIndex.current = -1;
    errorsIndex.current = [];
    totalCount.current = 0;
    sentence.current = [];
    setTimer(duration);
    setWordsPerMinute(0);
  };

  const handleStop = () => {
    setIsActive(false);
    calculateWPM();
  };

  const handleReset = () => {
    setIsActive(false);
    setInput('');
    sentence.current = [];
    setTimer(duration);
    currentIndexOfWord.current = 0;
    errorsIndex.current = [];
    currentErrorIndex.current = -1;
    totalCount.current = 0;
    setWordsPerMinute(0);
    setRandomWords()

  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    var currentText = e.target.value
    const length = currentText.length;
    const currentWord = words[currentIndexOfWord.current]
    if( currentText.trim().length > 0  && currentText[length-1]!=" "){
      var mapped = keyToNep[currentText[length-1]]
      if(mapped == undefined) mapped = ""
      currentText = currentText.substring(0,length-1)+mapped
    }
    // previousText.current = currentText


    // alert(currentText[currentText.length-1])
    if (isActive && currentText.trim().length > 0 && currentText[length - 1] == " ") {
      totalCount.current++;
      console.log(totalCount)
      if (currentWord.substring(0, length) + " " != currentText) {
        errorsIndex.current.push(currentIndexOfWord.current);
        errorCounts.current++;
        // alert()
      }
      // else currentErrorIndex.current = -1;
      currentIndexOfWord.current++;
      if (currentIndexOfWord.current > words.length - 1) {
        setRandomWords()
        currentIndexOfWord.current = 0;
        errorsIndex.current = [];
        currentErrorIndex.current = -1;
      }

      setInput("")
    }
    else {
      // alert(currentWord.slice(0,length))
      if (currentWord.substring(0, length) != currentText)
        currentErrorIndex.current = currentIndexOfWord.current;
      else currentErrorIndex.current = -1;

      setInput(currentText)
    }
    if (!isActive && currentText.length == 1) {
      handleStart()
    }//
  }

  return (
    <div className="flex font-serif flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white  bg-gray-100 text-gray-800 p-4">





      <div className="w-full max-w-5xl relative dark:bg-gray-700 bg-white rounded-lg shadow-md p-6 space-y-6">

        {
          modalIsOpen && <div className='absolute  left-[50%] h-[70%] -translate-y-[50%] shadow-lg -translate-x-[50%] top-[50%] p-7 rounded-md w-[80%] bg-gray-800'>
            <div className='text-center text-5xl mb-10 bg-green-700 rounded-md text-white font-bold'>{wordsPerMinute} WPM</div>
            <div className='flex justify-between text-2xl px-20'>
              <div className="div">Accuracy</div>
              <div>{result.accuracy}</div>
            </div>
            <div className='w-full h-[1px] bg-white'></div>
            <div className='flex justify-between text-2xl px-20'>

              <div className="div">Correct Words</div>
              <div>{result.right}</div>
            </div>
            <div className='w-full h-[1px] bg-white'></div>

            <div className='flex justify-between text-2xl px-20'>

              <div className="div text-red-600">Wrong Words</div>
              <div>{result.wrong}</div>
            </div>
            <div className='w-full h-[1px] bg-white'></div>

            <div className='text-center flex justify-center mt-6'>
              <button
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600 focus:outline-none"
                onClick={() => { setIsOpen(false); handleReset() }}
              >
                Close
              </button>
            </div>



          </div>
        }

        <div className="text-center flex justify-center gap-10">
          <div className="div">
            <div className="text-4xl font-bold mb-2">{timer}</div>
            <div className="text-xl">
              {isActive ? "Time remaining" : wordsPerMinute > 0 ? `${wordsPerMinute} WPM` : "Ready"}
            </div>

          </div>
          {/* <div className="div">Hello</div> */}


        </div>

        <div className="dark:bg-gray-800 flex flex-wrap p-4 rounded">
          {
            words.map((word, index) => {
              return <span key={index} className={'text-3xl mx-1 p-1 rounded-md font-medium ' +

                (index == currentIndexOfWord.current && (currentErrorIndex.current == currentIndexOfWord.current ? "bg-red-500 " : "bg-gray-500 ")) +
                (index < currentIndexOfWord.current && (errorsIndex.current.indexOf(index) != -1 ? " text-red-500 " : " text-green-500 "))
              }>
                {word}
              </span>

            })
          }
        </div>

        <textarea
          className="w-full text-3xl p-4 border-2 dark:bg-gray-800 border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none h-32"
          value={input}
          onChange={(e) => handleInput(e)}
          placeholder={isActive ? "" : "Start typing here..."}
          disabled={modalIsOpen}
        />

        <div className="flex justify-center space-x-4">

          {/* <button
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            onClick={handleStop}
            disabled={!isActive}
          >
            <StopCircle className="w-5 h-5 mr-2" />
            Stop
          </button> */}
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleReset}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}