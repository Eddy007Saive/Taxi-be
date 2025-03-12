import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function View() {

    return (
        <section className="bg-white dark:bg-gray-900 p-6">
            <div className="text-start mb-4">
                <h1 className="text-2xl font-semibold text-blue-800">Liste des vehicules</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <Link to={"/dashboard/vehicule/new"} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Créer Nouveau
                </Link>
            </div>

            <ToastContainer />
        </section>
    );
}

export default View;
