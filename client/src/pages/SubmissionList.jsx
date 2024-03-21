import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

export const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const location = useLocation();
  const { username } = useParams();
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://13.126.252.210:3000/submissions/${username}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }
    fetchSubmissions();
  }, [username]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Submitted Code Snippets</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Language</th>
              <th className="border px-4 py-2">Stdin</th>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Source Code</th>
              <th className="border px-4 py-2">Output</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{submission.username}</td>
                <td className="border px-4 py-2">{submission.code_language}</td>
                <td className="border px-4 py-2">{submission.stanndard_input}</td>
                <td className="border px-4 py-2">{submission.createdAt}</td>
                <td className="border px-4 py-2 overflow-hidden">
                  <pre className="whitespace-pre-wrap">{submission.code ? submission.code.slice(0, 100) : "N/A"}</pre>
                </td>
                <td className="border px-4 py-2">{submission.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
