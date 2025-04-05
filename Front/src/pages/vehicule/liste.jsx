import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import { getVehicules } from "@/services";
import { Link } from "react-router-dom";



export function liste() {
    const [voitures,setVoiture]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        const response= await getVehicules();
        setVoiture(response.data)
    }

    const columns = [ "immatriculation","marque","modele","capacite","statut"];

  return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                <div className="flex justify-between">
                    <span>

                Vehicule
                    </span>
                    <Link to="/dashboard/vehicule/nouveau">
                        Nouveau Vehicule
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
                {voitures.map(({ immatriculation,marque,modele,capacite,statut}, key)=> {
                    const className = `py-3 px-5 ${
                      key === voitures.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;
    
                      return (
                        <tr key={immatriculation}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {immatriculation}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {marque}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {modele}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {capacite}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {statut}
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

