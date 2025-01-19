import React, { useState } from 'react';
import { Trophy, Medal, Star, ChevronDown, Search } from 'lucide-react';

function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [categoryFilter, setCategoryFilter] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Johnson",
      score: 9850,
      testsCompleted: 45,
      accuracy: 92,
      streak: 15
    },
    {
      rank: 2,
      name: "Michael Chen",
      score: 9720,
      testsCompleted: 42,
      accuracy: 89,
      streak: 12
    },
    {
      rank: 3,
      name: "Emily Williams",
      score: 9680,
      testsCompleted: 40,
      accuracy: 88,
      streak: 10
    },
    // Add more users as needed
  ];

  const timeFilters = [
    { id: 'all-time', name: 'All Time' },
    { id: 'this-month', name: 'This Month' },
    { id: 'this-week', name: 'This Week' },
    { id: 'today', name: 'Today' }
  ];

  const categoryFilters = [
    { id: 'overall', name: 'Overall' },
    { id: 'quantitative', name: 'Quantitative' },
    { id: 'logical', name: 'Logical' },
    { id: 'verbal', name: 'Verbal' },
    { id: 'programming', name: 'Programming' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filters */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {timeFilters.map(filter => (
              <option key={filter.id} value={filter.id}>{filter.name}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categoryFilters.map(filter => (
              <option key={filter.id} value={filter.id}>{filter.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Winners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            {index === 0 && <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-4" />}
            {index === 1 && <Medal className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
            {index === 2 && <Medal className="h-12 w-12 mx-auto text-amber-700 mb-4" />}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h3>
            <p className="text-3xl font-bold text-indigo-600 mb-4">{user.score}</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <span>{user.testsCompleted} Tests</span>
              <span>{user.accuracy}% Accuracy</span>
              <span>{user.streak} Streak</span>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardData.map((user, index) => (
              <tr key={index} className={index < 3 ? 'bg-indigo-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">#{user.rank}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.score}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.testsCompleted}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.accuracy}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.streak} days</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;