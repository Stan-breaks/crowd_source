
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [locations, setLocations] = useState([
    {
      id: 1,
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    {
      id: 2,
      address: "456 Oak Rd",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    {
      id: 3,
      address: "789 Maple Ln",
      city: "London",
      state: "",
      country: "UK",
    },
    {
      id: 4,
      address: "321 Elm St",
      city: "Paris",
      state: "",
      country: "France",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const filteredLocations = useMemo(() => {
    return locations.filter((location) =>
      Object.values(location).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [locations, searchQuery])
  const [newLocation, setNewLocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  })
  const handleInputChange = (e) => {
    setNewLocation({
      ...newLocation,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocations([...locations, { id: locations.length + 1, ...newLocation }])
    setNewLocation({
      address: "",
      city: "",
      state: "",
      country: "",
    })
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Locations</h1>
        <p className="text-gray-500">View and manage the locations for your business.</p>
      </div>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id}>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="font-medium">{location.address}</div>
                <div className="text-gray-500">
                  {location.city}, {location.state} {location.country}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Location</CardTitle>
            <CardDescription>Enter the details for a new location.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newLocation.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={newLocation.city} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={newLocation.state} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={newLocation.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Add Location</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
