import React from 'react';
import { BarChart, BookOpen, Brain, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const stats = [
    { label: 'Questions Solved', value: '150', icon: BookOpen },
    { label: 'Tests Completed', value: '12', icon: Clock },
    { label: 'Success Rate', value: '75%', icon: Brain },
    { label: 'Current Rank', value: '#42', icon: BarChart },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, User!</h1>
      
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem
              title="Completed Mock Test"
              description="Quantitative Aptitude - Level 2"
              time="2 hours ago"
            />
            <ActivityItem
              title="Solved Question"
              description="Data Structures - Binary Trees"
              time="5 hours ago"
            />
            <ActivityItem
              title="Started New Topic"
              description="Verbal Ability - Reading Comprehension"
              time="1 day ago"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Practice</h2>
          <div className="space-y-3">
            <RecommendationItem
              title="Mock Test: Technical Aptitude"
              description="Based on your performance in programming questions"
              difficulty="Medium"
            />
            <RecommendationItem
              title="Practice Set: Logical Reasoning"
              description="Improve your puzzle-solving skills"
              difficulty="Hard"
            />
            <RecommendationItem
              title="Quick Quiz: SQL Fundamentals"
              description="Brush up your database concepts"
              difficulty="Easy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, description, time }) {
  return (
    <div className="flex space-x-3">
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}

function RecommendationItem({ title, description, difficulty }) {
  const difficultyColors = {
    Easy: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Hard: 'text-red-600 bg-red-100',
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
        {difficulty}
      </span>
    </div>
  );
}

export default Dashboard;