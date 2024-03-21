import React, { useState } from 'react';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';


export const SubmissionForm = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [language, setLanguage] = useState('java');
  const [stdin, setStdin] = useState('5 10');
  const [sourceCode, setSourceCode] = useState(`import java.util.Scanner;

public class AddNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}`);

  const navigate = useNavigate();

  const handleSubmit = async (e, to) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://13.126.252.210:3000/submit", {
        username,
        language,
        Stdinput: stdin,
        code: sourceCode,
      })

      console.log('Response from server:', response.data);
      navigate(`/submissions/${username}`, { state: response.data })
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === "Username already exists") {
        alert("Username already exists. Please choose a different username.");
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Submit Code Snippet</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block font-bold mb-2">
            Preferred Code Language:
          </label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                id="cpp"
                name="language"
                value="cpp"
                checked={language === 'cpp'}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label htmlFor="cpp" className="ml-2">
                C++
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="java"
                name="language"
                value="java"
                checked={language === 'java'}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label htmlFor="java" className="ml-2">
                Java
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="javascript"
                name="language"
                value="javascript"
                checked={language === 'javascript'}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label htmlFor="javascript" className="ml-2">
                JavaScript
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="python"
                name="language"
                value="python"
                checked={language === 'python'}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label htmlFor="python" className="ml-2">
                Python
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="stdin" className="block font-bold mb-2">
            Standard Input (stdin):
          </label>
          <input
            type="text"
            id="stdin"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sourceCode" className="block font-bold mb-2">
            Source Code:
          </label>
          <textarea
            id="sourceCode"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            rows="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
