import React, { useState } from 'react';
import './HomePage.css'; 

interface GameAppProps {
  aa: (username: string, cardNumber: string) => void;
}

const HomePage: React.FC<GameAppProps> = ({ aa }) => {
  const [formData, setFormData] = useState<{ username: string; selectedNumber: string }>({
    username: '',
    selectedNumber: '',
  });
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    aa(formData.username, formData.selectedNumber);
    setIsGameStarted(true); 
  };

  return (
    <div className="container">
      {!isGameStarted && ( 
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <select
            name="selectedNumber"
            id="options"
            value={formData.selectedNumber}
            onChange={handleChange}
            required
          >
            <option value="">Select number of cards</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>
          <input type="submit" value="Start Game" />
        </form>
      )}
    </div>
  );
};

export default HomePage;
