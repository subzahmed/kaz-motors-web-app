export function CarSpecifications({ car }: { car: any }) {
  const specifications = [
    { label: "Make", value: car.make },
    { label: "Model", value: car.model },
    { label: "Year", value: car.year },
    { label: "Mileage", value: `${car.mileage.toLocaleString()} miles` },
    { label: "Engine", value: car.engine },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Exterior Color", value: car.exteriorColor },
    { label: "Interior Color", value: car.interiorColor },
    { label: "VIN", value: car.vin },
  ]

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Vehicle Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div key={index} className="flex justify-between p-3 bg-white rounded-md">
            <span className="font-medium">{spec.label}</span>
            <span className="text-gray-600">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
