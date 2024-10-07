import DataTable from "react-data-table-component"

export const Dashboard_Gerente2 = () => {
  const columns = [
    {
      name: "TASK",
      selector: (row) => row.task,
    },
    {
      name: "TEAM",
      cell: (row) => <img src="/images/img-login-1.png" style={{ width: '30px', height: '30px', borderRadius: '50%' }} alt="team" />,
      selector: (row) => row.team
    },
    {
      name: "OPEN TASK",
      selector: (row) => row.open_task,
    },
    {
      name: "PRORITY",
      selector: (row) => row.prority,
      style: {
        color: '#16FF00',
      }
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      style: {
        color: '#0E185F',
        borderRadius: '20px',
        margin: '6px',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
      }
    },
  ]

  const data = [
    {
      task: "Task1",
      open_task: 27,
      prority: "High",
      status: "Completed"
    },
    {
      task: "Task2",
      open_task: 34,
      prority: "Normal",
      status: "Pending",
    },
    {
      task: "Task3",
      open_task: 39,
      prority: "Low",
      status: "Pending",
    },
  ]

  return (
    <div className="border border-gray-300 rounded-lg p-8">
      <h3 className="font-bold text-[1.2rem] pb-1">TASKS</h3>
      <p className="text-[13px] text-gris">A task is accomplished by a set deadline, and must contribute toward work-related objectives.</p>
      <DataTable 
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
      />
    </div>
  )
}


