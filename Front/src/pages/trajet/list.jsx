import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { getTrajets } from "@/services";
import { Link } from "react-router-dom";



export function liste() {
    const [trajets,setTrajet]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        const response= await getTrajets();
        setTrajet(response.data)
    }

    const columns = ["Départ", "Arrivé", "distance", "Durée","tarif","Action"];

  return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                <div className="flex justify-between">
                    <span>

                Trajets
                    </span>
                    <Link to="/dashboard/trajet/nouveau">
                        Nouveau Trajet
                    </Link>
                </div>
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {columns.map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {trajets.map(({ stationDepart, stationArrivee, distance_km, duree_estimee, tarif}, key)=> {
                    const className = `py-3 px-5 ${
                      key === trajets.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;
    
                      return (
                        <tr key={key}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {stationDepart && stationDepart.nom}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {stationArrivee && stationArrivee.nom}

                            </Typography>
            
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {distance_km}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {duree_estimee}
                            </Typography>
                          </td>
                          
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {tarif}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              Edit
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      );
}

export default liste

