import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import { getStations } from "@/services";
import { Link } from "react-router-dom";



export function liste() {
    const [station,setStation]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        const response= await getStations();
        setStation(response.data)
    }

    const columns = ["nom", "ville", "est_active", "code","horaires_ouverture","contact"];

  return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                <div className="flex justify-between">
                    <span>

                Stations
                    </span>
                    <Link to="/dashboard/station/nouveau">
                        Nouveau Station
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
                {station.map(({ nom, ville, adresse, est_active, code, horaires_ouverture,contact}, key)=> {
                    const className = `py-3 px-5 ${
                      key === station.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;
    
                      return (
                        <tr key={nom}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {nom}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {ville}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {adresse}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {adresse}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={est_active ? "green" : "blue-gray"}
                              value={est_active ? "online" : "offline"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {code}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {horaires_ouverture}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {contact}
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

