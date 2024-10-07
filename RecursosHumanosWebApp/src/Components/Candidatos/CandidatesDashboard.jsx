import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "../../utils/Spinner";
import { getLastName, getPuestoDeTrabajo } from "../../utils/apellidoUtils";

export function CandidatesDashboard({ contratarEmpleado, cambiosSwitch }) {
    const [candidates, setCandidates] = useState(null);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const url = import.meta.env.VITE_API_KEY;

    const columns = [
        {
            name: "Nombre",
            selector: (row) => {
                return row.first_name + " " + getLastName(row);
            },
            sortable: true,
        },
        {
            name: "Mail",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Telefono",
            selector: (row) => row.phone_number,
        },
        {
            name: "Puesto de trabajo",
            selector: (row) => {
                return getPuestoDeTrabajo(row);
            },
        },
        {
            name: "Fecha de Nacimiento",
            selector: (row) => {
                const fechaDeNacimiento = new Date(row.secondary_phone_number);
                return fechaDeNacimiento.toLocaleDateString("es-ar");
            },
        },
    ];

    const handleChange = (e) => {
        const filteredCandidates = data
            .map((candidate) => {
                const fullName =
                    candidate.first_name + " " + candidate.last_name;
                return { ...candidate, full_name: fullName };
            })
            .filter((candidate) =>
                candidate.full_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        console.log(filteredCandidates);
        setCandidates(filteredCandidates);
    };

    useEffect(() => {
        fetch(`${url}/api/v1/postulants?page=${currentPage}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data.results);
                setCandidates(data.results);
                setTotalResults(data.count);
            });
    }, [cambiosSwitch, currentPage]);

    if (!candidates)
        return (
            <div className="mt-20 grid place-items-center">
                <Spinner />
            </div>
        );

    return (
        <div className="m-2 mb-8 shadow-xl">
            <input
                type="text"
                onChange={handleChange}
                placeholder="Buscar por nombre..."
                className="px-2 py-0.5 border-2 border-gray-300 rounded-md"
            />
            <DataTable
                columns={columns}
                data={candidates}
                highlightOnHover
                pointerOnHover
                responsive
                pagination
                paginationServer
                paginationTotalRows={totalResults}
                paginationPerPage={10}
                paginationComponentOptions={{ noRowsPerPage: true }}
                onChangePage={(page) => setCurrentPage(page)}
                onRowClicked={(index) => contratarEmpleado(index)}
            />
        </div>
    );
}
