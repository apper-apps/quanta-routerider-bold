import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { bookingService } from "@/services/api/bookingService";
import { routeService } from "@/services/api/routeService";
import { toast } from "react-toastify";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [routes, setRoutes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const bookingData = await bookingService.getBookings();
      setBookings(bookingData);
      
      // Load route details for each booking
      const routePromises = bookingData.map(booking => 
        routeService.getRouteById(booking.routeId)
      );
      
      const routeData = await Promise.all(routePromises);
      const routeMap = {};
      routeData.forEach(route => {
        routeMap[route.Id] = route;
      });
      setRoutes(routeMap);
      
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      loadBookings(); // Reload bookings
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRetry = () => {
    loadBookings();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty
            title="No Bookings Found"
            message="You haven't made any bus bookings yet. Start planning your next journey!"
            actionText="Search Buses"
            onAction={() => window.location.href = "/"}
            icon="Ticket"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage your bus tickets and travel history
          </p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => {
            const route = routes[booking.routeId];
            if (!route) return null;

            return (
              <Card key={booking.Id} className="p-6 animate-fadeIn">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 p-2 rounded-lg">
                          <ApperIcon name="Bus" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 font-display">
                            {route.operator}
                          </h3>
                          <p className="text-gray-600">
                            {route.origin} → {route.destination}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Travel Date</div>
                        <div className="font-semibold text-gray-900">
                          {formatDate(booking.travelDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Departure</div>
                        <div className="font-semibold text-gray-900">
                          {formatTime(route.departureTime)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Seats</div>
                        <div className="flex flex-wrap gap-1">
                          {booking.seats.map((seat, index) => (
                            <Badge key={index} variant="warning" className="text-xs">
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Total Price</div>
                        <div className="font-bold text-primary text-lg">
                          ${booking.totalPrice}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Booking Reference: <span className="font-semibold text-primary">
                          {booking.bookingReference}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon="Eye"
                        >
                          View Details
                        </Button>
                        {booking.status === "confirmed" && (
                          <Button
                            onClick={() => handleCancelBooking(booking.Id)}
                            variant="danger"
                            size="sm"
                            icon="X"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Ticket" size={24} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 font-display">
              {bookings.length}
            </div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-gradient-to-r from-success/10 to-green-600/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-gray-900 font-display">
              {bookings.filter(b => b.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmed Trips</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-gradient-to-r from-accent/10 to-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="DollarSign" size={24} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-gray-900 font-display">
              ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bookings;