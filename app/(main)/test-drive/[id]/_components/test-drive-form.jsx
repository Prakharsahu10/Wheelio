"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Car,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { bookTestDrive } from "@/actions/test-drive";
import { formatCurrency } from "@/lib/helpers";
import Image from "next/image";

export const TestDriveForm = ({ car, testDriveInfo }) => {
  const { user, isSignedIn } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses?.[0]?.emailAddress || "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const {
    loading: bookingTestDrive,
    fn: bookTestDriveFn,
    data: bookingResult,
    error: bookingError,
  } = useFetch(bookTestDrive);

  // Update form data when user info is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.emailAddresses?.[0]?.emailAddress || prev.email,
      }));
    }
  }, [user]);

  // Handle successful booking
  useEffect(() => {
    if (bookingResult?.success) {
      toast.success("Test drive booked successfully!");
      router.push(`/cars/${car.id}`);
    }
  }, [bookingResult, router, car.id]);

  // Handle booking errors
  useEffect(() => {
    if (bookingError) {
      toast.error(bookingError.message || "Failed to book test drive");
    }
  }, [bookingError]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to book a test drive");
      router.push("/sign-in");
      return;
    }

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Format the data to match the action's expected parameters
    const bookingData = {
      carId: car.id,
      bookingDate: formData.preferredDate,
      startTime: formData.preferredTime,
      endTime: formData.preferredTime, // You might want to calculate end time
      notes: formData.message,
    };

    await bookTestDriveFn(bookingData);
  };

  // Generate available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Check if user already has a test drive booked
  if (testDriveInfo.userTestDrive) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert className="mb-6">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Test Drive Already Booked</AlertTitle>
          <AlertDescription>
            You already have a test drive booked for this vehicle on{" "}
            {new Date(
              testDriveInfo.userTestDrive.bookingDate
            ).toLocaleDateString()}
            .
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Current Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Date
                  </Label>
                  <p className="text-lg">
                    {new Date(
                      testDriveInfo.userTestDrive.bookingDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Time
                  </Label>
                  <p className="text-lg">
                    {testDriveInfo.userTestDrive.preferredTime}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Status
                  </Label>
                  <Badge
                    variant={
                      testDriveInfo.userTestDrive.status === "CONFIRMED"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {testDriveInfo.userTestDrive.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={() => router.push("/dashboard/test-drives")}
                  className="w-full"
                >
                  View All My Test Drives
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    {formatCurrency(car.price)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Body Type:</span>
                    <p className="font-medium">{car.bodyType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Fuel Type:</span>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Transmission:</span>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Mileage:</span>
                    <p className="font-medium">
                      {car.mileage?.toLocaleString()} miles
                    </p>
                  </div>
                </div>

                {car.images && car.images.length > 0 && (
                  <div className="mt-4 relative w-full h-48">
                    <Image
                      src={car.images[0]}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dealership Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dealership Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Wheelio Motors</p>
                <p className="text-gray-600">
                  {testDriveInfo.dealership?.address ||
                    "123 Main Street, City, State 12345"}
                </p>
                <p className="text-gray-600">
                  Phone: {testDriveInfo.dealership?.phone || "(555) 123-4567"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Your Test Drive
              </CardTitle>
              <CardDescription>
                Fill out the form below to schedule your test drive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Scheduling */}
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="preferredDate"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="preferredTime"
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Preferred Time *
                    </Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredTime: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Additional Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or questions..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={bookingTestDrive}
                >
                  {bookingTestDrive ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking Test Drive...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Test Drive
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestDriveForm;
