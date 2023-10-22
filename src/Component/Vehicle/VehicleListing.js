import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VEHICLE_LISTING_API_ENDPOINT } from '../../api/Api';
import './VehicleListing.css'

function VehicleListing() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get(VEHICLE_LISTING_API_ENDPOINT)
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setVehicles(response.data.data);
        } else {
          console.error('API response does not contain an array of data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle data:', error);
      });
  }, []);

  return (
    <div className="vehicle-list-container">
      <h2 className="heading">Vehicle List</h2>
      <ul className="vehicle-list">
        {vehicles.map((vehicle) => (
          <li className="vehicle-item" key={vehicle.id}>
            <div className="vehicle-details">
              <span className="vehicle-info">Vehicle Type: {vehicle.attributes.vehicle_type}</span>
              <span className="vehicle-info">License Plate: {vehicle.attributes.license_plate}</span>
              <span className="vehicle-info">Status: {vehicle.attributes.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleListing;
