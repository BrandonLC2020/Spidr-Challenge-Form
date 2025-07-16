/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    airfryerCost: '',
    spidrPin: '',
  });

  const appContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      const container = appContainerRef.current;
      if (container) {
      const rect = container.getBoundingClientRect();
      const x: number = e.clientX - rect.left;
      const y: number = e.clientY - rect.top;
      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
      }
    };

    const container = appContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'spidrPin') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove all non-digit characters
        .slice(0, 16) // Ensure we only have 16 digits
        .replace(/(.{4})/g, '$1-') // Add a dash every 4 characters
        .replace(/-$/, ''); // Remove trailing dash

      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  interface FormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form data has been logged to the console. Press F12 to view.');
  };

  return (
    <main ref={appContainerRef} className="app-container" aria-labelledby="form-title">
      <div className="form-container">
        <header>
            <h1 id="form-title">Spidr Registration</h1>
            <p>Join the network. Guess the price.</p>
        </header>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="airfryerCost">Guess the air fryer’s cost</label>
            <div className="input-with-adornment">
              <span>$</span>
              <input
                type="number"
                id="airfryerCost"
                name="airfryerCost"
                value={formData.airfryerCost}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="spidrPin">A very, very secret 16-digit Spidr PIN</label>
            <input
              type="text"
              id="spidrPin"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleChange}
              placeholder="####-####-####-####"
              maxLength={19}
              required
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
