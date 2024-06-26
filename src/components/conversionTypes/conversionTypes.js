import './conversionTypes.css';
import { useFileConversion } from '../../contextAPI/fileConversionContext';
import { FaExchangeAlt } from 'react-icons/fa';

export default function ConversionTypes() {
  const { conversions, swapConversion, setConversion } = useFileConversion();

  const handleFromChange = (event) => {
    const from = event.target.value;
    const firstToOption = conversions.options.find(option => option.from === from);
    setConversion(from, firstToOption ? firstToOption.to : '');
  };

  const handleToChange = (event) => {
    const to = event.target.value;
    setConversion(conversions.current.from, to);
  };

  const isSwapDisabled = conversions.options.findIndex(option =>
    option.from === conversions.current.to &&
    option.to === conversions.current.from
  ) === -1;

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-4 text-center file-box">
          <select className="form-select" value={conversions.current.from} onChange={handleFromChange}>
            {conversions.fromTypes.map((from, index) => (
              <option key={index} value={from}>{from}</option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <button
            onClick={swapConversion}
            className={`swap-button ${isSwapDisabled ? 'disabled' : ''}`}
            disabled={isSwapDisabled}
          >
            <FaExchangeAlt />
          </button>
        </div>
        <div className="col-4 text-center file-box">
          <select className="form-select" value={conversions.current.to} onChange={handleToChange}>
            {conversions.toOptions.map((option, index) => (
              <option key={index} value={option.to}>{option.to}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}