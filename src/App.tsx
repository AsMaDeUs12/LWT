import { useEffect, useState } from 'react';
import './index.css';
import { bear, coin, notcoin, trophy } from './images';

const App = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 1;
  });
  const [energy, setEnergy] = useState(() => {
    const savedEnergy = localStorage.getItem('energy');
    return savedEnergy ? parseInt(savedEnergy) : 100;
  });
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 100));
    }, 1000); // Restore 1 energy point every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('energy', energy.toString());
  }, [energy]);

  const animatedText = "LOCK WALLET".split("").map((char, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char === " " ? "\u00A0" : char}</span>
  ));
  const animatedText1 = "Innovative cryptocurrency app".split("").map((char, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char === " " ? "\u00A0" : char}</span>
  ));
 

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
            <a href="https://t.me/Lock_Wallet" target="_blank" rel="noopener noreferrer"> 
             <p className="text-lg font-bold">Multichain Telegram Wallet</p> </a>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center space-y-4"> 
          <div className="flex items-center space-x-4">
            <p className="text-lg font-bold animated-text">{animatedText}</p>
          </div>
          <div className="relative flex flex-col items-center space-y-2">
            <img src={notcoin} width={350} height={350} alt="notcoin" className="flicker-image" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                1
              </div>
            ))}
          </div>

          <div className="import-button-container"> 
            <p className="font-bold" style={{ textAlign: 'center', fontSize: '44px' }}>Innovative<br></br> cryptocurrency app</p><p style={{ textAlign: 'center', fontSize: '18px', color: '#C1C1C1'}} >Step into the future with Lock Wallet – your one-stop solution for managing, trading, and exchanging cryptocurrencies.<br></br>
            </p>
            <button className="import-button">Comming soon</button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-around">
          <a href="http://lockapp.tech/" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center gap-2 button-style">
              <img src={coin} width={24} height={24} alt="Website" />
              <span>Website</span>
            </button></a>
            <a href="https://x.com/Lock_Wallet" target="_blank" rel="noopener noreferrer">
  <button className="flex items-center gap-2 button-style">
    <img src={bear} width={24} height={24} alt="Twitter" />
    <span>Twitter</span>
  </button>
</a>
<a href="https://t.me/Lock_Wallet" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center gap-2 button-style">
              <img src={trophy} width={24} height={24} alt="Telegram" />
              <span>Telegram</span>
            </button></a>
          </div>
          <div className="w-full bg-[#f9f9f9] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#054475] to-[#054475] h-4 rounded-full" style={{ width: `${(energy / 100) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
