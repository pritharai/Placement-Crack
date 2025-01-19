import React from 'react';
import { BarChart, BookOpen, Brain, Clock, Upload, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '150', icon: BookOpen },
    { label: 'Articles Uploaded', value: '25', icon: Upload },
    { label: 'Tests Conducted', value: '30', icon: Clock },
    { label: 'Average Success Rate', value: '80%', icon: Brain },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Functional Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Progress Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Progress</h2>
          <div className="space-y-3">
            <ProgressItem
              username="John Doe"
              progress="85%"
              lastActivity="Completed Mock Test - SQL Basics"
            />
            <ProgressItem
              username="Jane Smith"
              progress="90%"
              lastActivity="Solved Data Structures Quiz"
            />
            <ProgressItem
              username="Alex Johnson"
              progress="70%"
              lastActivity="Started Logical Reasoning Practice"
            />
          </div>
        </div>

        {/* Article Upload Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Articles</h2>
          <div className="space-y-3">
            <UploadArticleForm />
          </div>
        </div>
      </div>

      {/* Test Results Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
        <div className="space-y-3">
          <TestResultItem
            username="John Doe"
            score="85%"
            testName="Technical Aptitude - Level 3"
          />
          <TestResultItem
            username="Jane Smith"
            score="92%"
            testName="Logical Reasoning - Advanced"
          />
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function ProgressItem({ username, progress, lastActivity }) {
  return (
    <div className="flex space-x-3">
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium text-gray-900">{username}</h3>
        <p className="text-sm text-gray-500">Progress: {progress}</p>
        <p className="text-sm text-gray-500">Last Activity: {lastActivity}</p>
      </div>
    </div>
  );
}

function UploadArticleForm() {
  const handleUpload = (e) => {
    e.preventDefault();
    alert('Article uploaded successfully!');
  };

  return (
    <form onSubmit={handleUpload} className="space-y-3">
      <input
        type="text"
        placeholder="Article Title"
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      />
      <textarea
        placeholder="Article Content"
        className="w-full p-2 border border-gray-300 rounded-lg"
        rows="5"
        required
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Upload Article
      </button>
    </form>
  );
}

function TestResultItem({ username, score, testName }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-900">{username}</h3>
        <p className="text-sm text-gray-500">Test: {testName}</p>
      </div>
      <span className="text-sm font-semibold text-gray-900">{score}</span>
    </div>
  );
}

export default AdminDashboard;
