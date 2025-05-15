// src/pages/Dashboard/Dashboard.tsx

import React from "react";
import { useAuth } from "../../services/auth/authContext";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Dashboard: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Flight Booking System
          </h1>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Logged in as:{" "}
              <span className="font-medium">{user?.username}</span>
              {isAdmin && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Admin
                </span>
              )}
            </div>

            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isAdmin ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Admin Dashboard
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* System Stats */}
                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">243</div>
                    <div className="text-sm font-medium text-gray-500">
                      Total Users
                    </div>
                  </div>
                </Card>

                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">128</div>
                    <div className="text-sm font-medium text-gray-500">
                      Total Flights
                    </div>
                  </div>
                </Card>

                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">394</div>
                    <div className="text-sm font-medium text-gray-500">
                      Active Bookings
                    </div>
                  </div>
                </Card>

                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      $42,582
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </div>
                  </div>
                </Card>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
                Recent Bookings
              </h3>

              <Card>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Flight
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Sample data - replace with real data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          John Doe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          FL-123 (New York → London)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 15, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $349.99
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Jane Smith
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          FL-456 (Paris → Tokyo)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 16, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $789.99
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Bob Johnson
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          FL-789 (Dubai → Sydney)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 17, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $1,299.99
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                User Dashboard
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* User Stats */}
                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm font-medium text-gray-500">
                      My Upcoming Flights
                    </div>
                  </div>
                </Card>

                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">2</div>
                    <div className="text-sm font-medium text-gray-500">
                      Past Flights
                    </div>
                  </div>
                </Card>

                <Card className="bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      5,280
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Reward Miles
                    </div>
                  </div>
                </Card>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">
                My Bookings
              </h3>

              <Card>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Flight
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          From
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          To
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Sample data - replace with real data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          FL-123
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          New York (JFK)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          London (LHR)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 18, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          FL-456
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          London (LHR)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Paris (CDG)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 25, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="mt-6">
                <Button variant="primary">Book a New Flight</Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
